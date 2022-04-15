const path = require("path");
const fs = require("fs");
const get = require("../queries/CRUD/retrieve");

module.exports = class Pricing {
  //TODO: implement in last assignment
  // constructor() {
  //     this.PPG = 1.5
  // }
  static async calculate(username, state, gals) {
    state = state.toLowerCase();

    let ppg = 1.5,
      stateFact,
      histrFact,
      galsFact,
      profFact = 0.1;

    let res = await get.getFuelQuote(username);
    res = res.rowCount;

    if (state === "tx" || state === "texas") stateFact = 0.02;
    else stateFact = 0.04;

    if (res !== 0) histrFact = 0.01;
    else histrFact = 0;

    if (gals > 1000) galsFact = 0.02;
    else galsFact = 0.03;

    var margin = ppg * (stateFact - histrFact + galsFact + profFact);
    var sugPPG = Math.round((ppg + margin) * 100) / 100;

    return { suggested_ppg: sugPPG, total: sugPPG * gals };
  }
};
