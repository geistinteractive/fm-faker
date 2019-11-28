import { query as q } from "faunadb";
import udfBuilder from "../fauna-utils/udfBuilder";

const {
  Collection,
  Get,
  Create,
  Map,
  Paginate,
  Index,
  Lambda,
  Match,
  Var,
  Query,
  Let,
  Select,
  Do,
  Delete
} = q;

export const CreateFileQuery = Query(
  Lambda(
    "file",
    Let(
      {
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
    )
  )
);

const { callFn, createFn, updateFn, deleteFn, createOrUpdateFn } = udfBuilder(
  "fm_file_create",
  CreateFileQuery
);

export {
  callFn as createFMFile,
  deleteFn as deleteFMFileCreateFn,
  createOrUpdateFn as updateFMFileCreateFn
};
