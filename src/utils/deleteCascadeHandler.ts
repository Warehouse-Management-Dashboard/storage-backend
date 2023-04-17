export const deleteCascadeHandler = async (
    models: any[],
    associatedModels: any[],
    id: any,
    columnName: string
  ) => {
    for (const model of associatedModels) {
      const childModels = await models[model].findAll({
        where: {
          [columnName]: id,
        },
      });
  
      for (const childModel of childModels) {
        await childModel.destroy();
      }
    }
  };