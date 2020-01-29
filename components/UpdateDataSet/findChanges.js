export default function findChanges(oldData, newParsedData) {
  const oldTables = oldData.data.tables.data;
  const newTables = newParsedData.tables;
  return findTableChanges(oldTables, newTables);
}

function findTableChanges(oldTables, newTables) {
  const changes = [];

  newTables.forEach(newTable => {
    const oldTable = oldTables.find(oldTable => {
      return oldTable.data.id === newTable.id;
    });
    if (!oldTable) {
      //new tables
      const name = newTable.name;
      changes.push({ name, type: "new", data: newTable });
    } else {
      let changeDetected = false;
      let change = {};
      const oldName = oldTable.data.name;
      if (oldName !== newTable.name) {
        changeDetected = true;
        change.newName = newTable.name;
      }

      const fieldChanges = compareFields(oldTable.data, newTable);
      if (fieldChanges.length > 0) {
        changeDetected = true;
        change.fieldChanges = fieldChanges;
      }
      if (changeDetected) {
        const ref = oldTable.ref["@ref"].id;
        changes.push({ name: oldName, ref, type: "mod", ...change });
      }
    }
  });

  //deleted tables
  oldTables.forEach(oldTable => {
    const id = oldTable.data.id;
    const name = oldTable.data.name;
    const newTable = newTables.find(newTable => {
      return newTable.id === id;
    });
    if (!newTable) {
      const ref = oldTable.ref["@ref"].id;
      changes.push({ name, type: "delete", ref });
    }
  });

  return changes;
}

function compareFields(oldTable, newTable) {
  const oldFieldArray = oldTable.fields.data;
  const newFieldArray = newTable.fields;
  const changes = findChangesToExisting(oldFieldArray, newFieldArray);
  const newFields = findNew(oldFieldArray, newFieldArray);

  newFields.forEach(newField => {
    changes.push({ type: "new", data: newField });
  });
  return changes;
}

function findNew(oldFieldArray, newFieldArray) {
  function findOldField(id) {
    return oldFieldArray.find(oldField => {
      return oldField.data.id === id;
    });
  }

  return newFieldArray.filter(newField => {
    const oldField = findOldField(newField.id);

    return oldField ? false : true;
  });
}

function findChangesToExisting(oldFieldArray, newFieldArray) {
  function findNewField(id) {
    return newFieldArray.find(newField => {
      return newField.id === id;
    });
  }

  const changesToExistingFields = [];
  oldFieldArray.forEach(oldField => {
    const data = oldField.data;
    const id = data.id;
    const ref = oldField.ref["@ref"].id;
    const newVersion = findNewField(id);

    if (!newVersion)
      return changesToExistingFields.push({ ref, type: "deleted" });

    const oldType = data.datatype;
    const changes = {};
    let changeDetected = false;
    if (newVersion.datatype != oldType) {
      changeDetected = true;
      changes.newType = newVersion.datatype;
    }

    const oldName = data.name;
    if (oldName !== newVersion.name) {
      changeDetected = true;
      changes.newName = newVersion.name;
    }
    if (changeDetected) {
      changesToExistingFields.push({
        ref,
        type: "mod",
        data: changes
      });
    }
  });

  return changesToExistingFields;
}
