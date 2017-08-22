const getVisibleMountains = (mountains, query, filters) => {
  console.log("ESSSTAS EN VISIBLE MONTAINS PAPAPAPA")
  console.log(query)
  console.log(filters.price_value[0])
  console.log(filters.price_value[1])


  let filtered_mountains = mountains.filter((mt) => {
    let name = mt.properties.name.toLowerCase();
    let range = mt.properties.range.toLowerCase();
     console.info(mt.properties.price)
    if(((query !== '' && name.indexOf(query) !== -1) || (range.indexOf(query) !== -1))
      && (
        filters.price_value[0] <= mt.properties.price
        && filters.price_value[1] >= mt.properties.price
        )) {
      return mt;
    }
    return false;
  });

  return filtered_mountains;

}

export default getVisibleMountains;
