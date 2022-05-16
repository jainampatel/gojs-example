exports.data = {
  level1: {
    nodeDataArr: [
      { id: 0, text: "Patel Family" },
      { id: 1, text: "Nilesh" },
      { id: 2, text: "Geeta" },
      { id: 3, text: "Jainam" },
    ],
    linkDataArr: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
    ],
  },
  level2: [
    {
      id: 1,
      children: {
        nodeDataArr: [
          { id: "L1I11", text: "Father" },
          { id: "L1I12", text: "Mother" },
          { id: "L1I13", text: "Wife" },
          { id: "L1I14", text: "BOD" },
          { id: "L1I15", text: "Suryakant Patel" },
          { id: "L1I16", text: "Vansti Patel" },
          { id: "L1I17", text: "Geeta Patel" },
          { id: "L1I18", text: "05/03/1975" },
        ],
        linkDataArr: [
          { from: 1, to: "L1I11" },
          { from: 1, to: "L1I12" },
          { from: 1, to: "L1I13" },
          { from: 1, to: "L1I14" },
          { from: "L1I11", to: "L1I15" },
          { from: "L1I12", to: "L1I16" },
          { from: "L1I13", to: "L1I17" },
          { from: "L1I14", to: "L1I18" },
        ],
      },
    },
    {
      id: 2,
      children: {
        nodeDataArr: [
          { id: "L1I21", text: "Father" },
          { id: "L1I22", text: "Mother" },
          { id: "L1I23", text: "Husband" },
          { id: "L1I24", text: "BOD" },
          { id: "L1I25", text: "Mafat Patel" },
          { id: "L1I26", text: "Narabda Patel" },
          { id: "L1I27", text: "Nilesh Patel" },
          { id: "L1I28", text: "10/03/1976" },
        ],
        linkDataArr: [
          { from: 2, to: "L1I21" },
          { from: 2, to: "L1I22" },
          { from: 2, to: "L1I23" },
          { from: 2, to: "L1I24" },
          { from: "L1I21", to: "L1I25" },
          { from: "L1I22", to: "L1I26" },
          { from: "L1I23", to: "L1I27" },
          { from: "L1I24", to: "L1I28" },
        ],
      },
    },
    {
      id: 3,
      children: {
        nodeDataArr: [
          { id: "L1I31", text: "Father" },
          { id: "L1I32", text: "Mother" },
          { id: "L1I33", text: "BOD" },
          { id: "L1I34", text: "Nilesh Patel" },
          { id: "L1I35", text: "Geeta Patel" },
          { id: "L1I36", text: "25/01/2001" },
        ],
        linkDataArr: [
          { from: 3, to: "L1I31" },
          { from: 3, to: "L1I32" },
          { from: 3, to: "L1I33" },
          { from: "L1I31", to: "L1I34" },
          { from: "L1I32", to: "L1I35" },
          { from: "L1I33", to: "L1I36" },
        ],
      },
    },
  ],
};
