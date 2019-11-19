import File from "./lastSet.json";
import fileClassifier from "./api-services/db/classifier";

const result = fileClassifier(File);

result.then(r => console.log(File.tables[1].fields));
