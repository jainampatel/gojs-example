const UserReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return { details: { ...action.payload, id: [] } };
    case "Append":
      return state.details?.id.filter((d) => d === action.payload?.id)
        .length === 0
        ? {
            details: {
              id: [...state.details?.id, action.payload?.id],
              nodeDataArr: [
                ...state.details?.nodeDataArr,
                ...action.payload?.children?.nodeDataArr,
              ],
              linkDataArr: [
                ...state.details?.linkDataArr,
                ...action.payload?.children?.linkDataArr,
              ],
            },
          }
        : {
            details: {
              id: state.details?.id.filter(
                (filterData) => filterData !== action.payload?.id
              ),
              nodeDataArr: state.details?.nodeDataArr.filter(
                (filterData) =>
                  !action.payload?.children?.nodeDataArr.some(
                    (mapData) => filterData.id === mapData.id
                  )
              ),
              linkDataArr: state.details?.linkDataArr.filter(
                (filterData) =>
                  !action.payload?.children?.linkDataArr.some(
                    (mapData) => filterData.from === mapData.from
                  )
              ),
            },
          };
    default:
      return state;
  }
};

export default UserReducer;
