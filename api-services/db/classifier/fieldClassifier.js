import generateData from "../../../utils/generateData";

export default async function fieldClassifier(Field) {
  Field.schema = getType(Field.datatype);
  byName(Field);
  if (Field.validation.unique === "True" || Field.autoEnter.unique) {
    Field.schema.unique = true;
  }
  if (
    Field.autoEnter.type === "CreationTimestamp" ||
    Field.autoEnter.type === "ModificationTimestamp"
  ) {
    Field.schema["fm-timestamp"] = {
      relativeDays: { from: -400, to: -1 }
    };
  }
}

function getType(datatype) {
  switch (datatype) {
    case "Text":
      return { type: "string" };
    case "Number":
      return { type: "integer", minimum: 0 };
    case "Date":
      return { type: "string", "fm-date": "" };
    case "Time":
      return { type: "string", "fm-time": "" };
    case "Timestamp":
      return { type: "string", "fm-timestamp": "" };
    case "Binary":
      return { type: "string" };
    default:
      return "unknown";
  }
}

function byName(Field) {
  const fieldName = Field.name.toLowerCase();
  const matchers = Object.keys(NameMatches);

  matchers.forEach(matcher => {
    let matched = true;
    if (matcher.includes("|")) {
      const split = matcher.split("|");
      split.forEach(matcher => {
        if (!fieldName.includes(matcher)) {
          matched = false;
        }
      });
    } else {
      matched = fieldName.includes(matcher);
    }

    if (matched) {
      const obj = NameMatches[matcher];
      Field.schema = { ...Field.schema, ...obj };
      return;
    }
  });
}

const NameMatches = {
  email: { chance: "email" },
  city: { faker: "address.city" },
  state: { faker: "address.stateAbbr" },
  street: { faker: "address.streetAddress" },
  zip: { faker: "address.zipCode" },
  user: { faker: "internet.userName" },
  phone: { chance: "phone" },
  url: { chance: "internet.url" },
  website: { chance: "internet.url" },
  password: { faker: "internet.password" },
  company: { faker: "company.companyName" },
  "name|first": { faker: "name.firstName" },
  "name|last": { faker: "name.lastName" },
  title: { faker: "name.jobTitle" },
  notes: { faker: "lorem.sentences" },
  photo: { faker: "image.image" }
};
