import maplibregl from "maplibre-gl";

export async function onMapLoad(map: maplibregl.Map) {
  const olympics = await map.loadImage("img/olympics.png");
  map.addImage("olympics", olympics.data);
  const world_championship = await map.loadImage("img/world_championship.png");
  map.addImage("world_championship", world_championship.data);
  const china_smash = await map.loadImage("img/china_smash.png");
  map.addImage("china_smash", china_smash.data);
  const saudi_smash = await map.loadImage("img/saudi_smash.png");
  map.addImage("saudi_smash", saudi_smash.data);
  const singapore_smash = await map.loadImage("img/singapore_smash.png");
  map.addImage("singapore_smash", singapore_smash.data);
  const us_smash = await map.loadImage("img/us_smash.png");
  map.addImage("us_smash", us_smash.data);
  const finals = await map.loadImage("img/finals.png");
  map.addImage("finals", finals.data);
  const champions = await map.loadImage("img/champions.png");
  map.addImage("champions", champions.data);
  const star_contender = await map.loadImage("img/star_contender.png");
  map.addImage("star_contender", star_contender.data);
  const contender = await map.loadImage("img/contender.png");
  map.addImage("contender", contender.data);
  const world_cup = await map.loadImage("img/world_cup.png");
  map.addImage("world_cup", world_cup.data);
}
