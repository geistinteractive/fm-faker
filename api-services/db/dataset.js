import client from "./client";
import { query as q } from "faunadb";
import fileClassifer, { tableClassifier } from "./classifier";

const {
  Call,
  Create,
  Collection,
  Get,
  Ref,
  Map,
  Paginate,
  Index,
  Lambda,
  Match,
  Var,
  Let,
  Select,
  Merge,
  Do
} = q;

const datasets = Collection("DataSets");

export async function createDataset(data) {
  await fileClassifer(data);
  const theQuery = createFileQuery(data);
  const result = await client.query(theQuery);
  return result;
}

export async function getDatasetsByUser(user) {
  const result = await client.query(findAllUserFiles(user));
  return result;
}

export async function deleteById(id) {
  const DeleteFunction = q.Function("fm_file_delete");
  const DeleteQuery = Call(DeleteFunction, id);
  const result = await client.query(DeleteQuery);
  return result;
}

export async function getDataSetById(id) {
  const myQuery = Let(
    {
      file: Ref(Collection("fm_file"), id)
    },
    _buildResultForFile()
  );
  const result = await client.query(myQuery);

  return result;
}

function findAllUserFiles(user) {
  return Let(
    {
      findResult: Paginate(Match(Index("fm_files_by_user"), user)),
      files: Map(Var("findResult"), Lambda("file", _buildResultForFile()))
    },
    Var("files")
  );
}

function _buildResultForFile() {
  return Let(
    {
      tables: Map(
        Paginate(Match(Index("tables_by_fk"), Var("file"))),
        Lambda(
          "table",
          Let(
            {
              fields: Map(
                Paginate(Match(Index("field_by_table"), Var("table"))),
                Lambda("field", Get(Var("field")))
              )
            },
            {
              ref: Select("ref", Get(Var("table"))),
              ts: Select("ts", Get(Var("table"))),
              data: Merge(Select("data", Get(Var("table"))), {
                fields: Var("fields")
              })
            }
          )
        )
      )
    },
    {
      ref: Select("ref", Get(Var("file"))),
      ts: Select("ts", Get(Var("file"))),
      data: Merge(Select("data", Get(Var("file"))), {
        tables: Var("tables")
      })
    }
  );
}

function updateFileQuery(id, data) {
  return Let(
    {
      tables: data.tables
    },
    Map(Var("tables"), Lambda("table", _buildCreateTableQuery(id)))
  );
}

function createFileQuery(data) {
  return Let(
    {
      file: data,
      tables: Select("tables", Var("file")),
      mainref: Select(
        "ref",
        Create(Collection("fm_file"), {
          data: {
            name: Select("name", Var("file")),
            userId: Select("userId", Var("file")),
            fileName: Select("fileName", Var("file"))
          }
        })
      ),
      id: Select("id", Var("mainref"))
    },
    Map(Var("tables"), Lambda("table", _buildCreateTableQuery(Var("id"))))
  );
}

function _buildCreateTableQuery(id) {
  const mainref = Ref(Collection("fm_file"), id);

  return Let(
    {
      fields: Select("fields", Var("table")),
      tableName: Select("name", Var("table")),
      tableref: Select(
        "ref",
        Create(Collection("fm_table"), {
          data: {
            fk: mainref,
            id: Select("id", Var("table")),
            name: Var("tableName"),
            mods: Select("mods", Var("table"))
          }
        })
      )
    },
    Map(
      Var("fields"),
      Lambda(
        "field",
        Create(Collection("fm_field"), {
          data: {
            fk: Var("tableref"),
            tableName: Var("tableName"),
            id: Select("id", Var("field")),
            name: Select("name", Var("field")),
            fieldtype: Select("fieldtype", Var("field")),
            datatype: Select("datatype", Var("field")),
            comment: Select("comment", Var("field")),
            schema: Select("schema", Var("field")),
            schemaOverride: Select("schemaOverride", Var("field")),
            autoEnter: Select("autoEnter", Var("field")),
            validation: Select("validation", Var("field"))
          }
        })
      )
    )
  );
}

export async function merge(id, data) {
  const old = await getDataSetById(id);
  updateParsed(old, data);

  await fileClassifer(data);
  const DeleteTableFunction = q.Function("fm-file-delete-tables");

  const DeleteTablesQuery = Call(DeleteTableFunction, id);
  const updateQuery = updateFileQuery(id, data);
  await client.query(Do(DeleteTablesQuery, updateQuery));
}

function updateParsed(oldData, newParsedData) {
  const oldTables = oldData.data.tables.data;
  const newTables = newParsedData.tables;
  newParsedData.ref = oldData.ref;

  newTables.map(newTable => {
    const oldTable = oldTables.find(oldTable => {
      return oldTable.data.id === newTable.id;
    });

    if (oldTable) {
      checkOldTableForSchema(newTable, oldTable);
    }
  });
}

function checkOldTableForSchema(newTable, oldTable) {
  const oldFieldArray = oldTable.data.fields.data;
  const newFieldArray = newTable.fields;

  newFieldArray.map(newField => {
    const oldField = oldFieldArray.find(oldField => {
      return newField.id === oldField.data.id;
    });

    if (oldField) {
      if (oldField.data.datatype === newField.datatype) {
        newField.schema = oldField.data.schema;
        if (oldField.data.schemaOverride) {
          newField.schemaOverride = oldField.data.schemaOverride;
        }
      }
      // add any other fields that need to carry over :-)
    }
  });
}
