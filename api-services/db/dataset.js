import client from "./client";
import { query as q } from "faunadb";
import { writeFileSync } from "fs";
import fileClassifer from "./classifier";

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
  Merge
} = q;

const datasets = Collection("DataSets");

export async function createDataset(data) {
  await fileClassifer(data);
  const theQuery = createFile(data);

  const result = await client.query(theQuery);

  writeFileSync("./lastSet.json", JSON.stringify(data, null, "  "));

  return result;
}

export async function getDatasetsByUser(user) {
  const result = await client.query(findAllUserFiles(user));
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

function createFile(data) {
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
      )
    },
    Map(
      Var("tables"),
      Lambda(
        "table",
        Let(
          {
            fields: Select("fields", Var("table")),
            tableName: Select("name", Var("table")),
            tableref: Select(
              "ref",
              Create(Collection("fm_table"), {
                data: {
                  fk: Var("mainref"),
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
                  sample: Select("sample", Var("field"))
                }
              })
            )
          )
        )
      )
    )
  );
}
