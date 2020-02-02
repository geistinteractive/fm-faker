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
  Foreach,
  Do,
  Delete
} = q;

// Query IS required here ???
export const query = Query(
  Lambda(
    "fileRef",

    Let(
      {
        parentref: Ref(Collection("fm_file"), Var("fileRef")),
        childSet: Paginate(Match(Index("tables_by_fk"), Var("parentref")), {
          size: 100000
        }),
        tableRefs: Select("data", Var("childSet")),
        arr: [],
        fieldRefs: Map(
          Var("childSet"),
          Lambda(
            "child",
            Map(
              Select(
                "data",
                Paginate(Match(Index("field_by_table"), Var("child")), {
                  size: 100000
                })
              ),
              Lambda("fr", Delete(Var("fr")))
            )
          )
        )
      },
      Do(
        Foreach(Var("childSet"), Lambda("child", Delete(Var("child")))),
        Delete(Var("parentref"))
      )
    )
  )
);

const { callFn, deleteFn, createOrUpdateFn } = udfBuilder(
  "fm_file_delete",
  query
);

export { callFn as deleteFile, createOrUpdateFn as updateDeleteFileFn };