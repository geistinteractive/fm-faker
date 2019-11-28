import { query as q } from "faunadb";
import udfBuilder from "../fauna-utils/udfBuilder";

const {
  Collection,
  Get,
  Ref,
  Map,
  Paginate,
  Index,
  Lambda,
  Match,
  Var,
  Query,
  Let,
  Select,
  Merge,
  Do,
  Delete,
  Join
} = q;

const hs = () => {
  return {
    ref: Select("ref", Get(Var("file"))),
    ts: Select("ts", Get(Var("file"))),
    data: Merge(Select("data", Get(Var("file"))), {
      tables: Var("tables")
    })
  };
};

export const FilesQ = Let(
  {
    fileResult: Paginate(Match(Index("fm_files_by_user"), "twitter|14164578")),
    files: Map(
      Var("fileResult"),
      Lambda(
        "file",
        Let(
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
        )
      )
    )
  },
  Var("files")
);

const handleTable = f => {
  return Let(
    {
      pages: Map(
        Paginate(Match(Index("field_by_table"), Var("ref"))),
        Lambda("page", Get(Var("page")))
      ),
      fields: Map(Var("pages"), Lambda("field", Var("field")))
    },
    { table: Get(Var("ref")), fields: Var("fields") }
  );
};

const query = Let(
  {
    file: Match(Index("fm_files_by_user"), "twitter|14164578"),
    tables: Map(
      Paginate(Join(Var("file"), Index("tables_by_fk"))),
      Lambda(
        "ref",

        Let(
          {
            pages: Map(
              Paginate(Match(Index("field_by_table"), Var("ref"))),
              Lambda("page", Get(Var("page")))
            ),
            fields: Map(Var("pages"), Lambda("field", Var("field")))
          },
          { table: Get(Var("ref")), fields: Var("fields") }
        )
      )
    )
  },
  { file: Get(Var("file")), tables: Var("tables") }
);

const { callFn, deleteFn, createOrUpdateFn } = udfBuilder("test_get", FilesQ);

export { createOrUpdateFn as createTest };
