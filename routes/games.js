
/*
 * GET games listing.
 */

gameList = [{ id:2000, name:"Mark's game" }, { id:2001, name:"Toby's game" }];

exports.list = function(req, res){
  res.json(gameList);
  gameList[1].id++;
};