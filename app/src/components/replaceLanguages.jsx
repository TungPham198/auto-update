const stringToArray = (string) => {
    let array = [];
    string.split(',').map((element) => {
            let data = element.split(';')
      array.push({'name' : data[0], 'value': data[1] ? data[1].replaceAll('q=', '') : 1});
   })
   
   return array;
}

const objectToString = (object) => {

}
export default { stringToArray, objectToString };
