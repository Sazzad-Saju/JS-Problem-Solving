/** Arguably the worst solution */

/** function to purmute of the items of an array */
function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;
  
    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;
  }
  /** Generate total matches each team with each other */
  let team = ['BD', 'AUS', 'IND', 'PAK', 'NZ']
  let match = []
      for(let i=0; i<team.length-1; i++){
          for(let j = i; j<team.length; j++){
              if(i==j){
                  continue;
              }
              match.push(team[i]+'-'+team[j])
          }
      }
  console.log('Total Match: ')
  console.log(match)
  console.log('Generating Schedule. Please Wait')
  // let match = [ 'BD-AUS',
  //   'BD-IND',
  //   'BD-PAK',
  //   'BD-NZ',
  //   'AUS-IND',
  //   'AUS-PAK',
  //   'AUS-NZ',
  //   'IND-PAK',
  //   'IND-NZ',
  //   'PAK-NZ' ]  //generated from pro 01
  
/** Propagate and select the desire series of games */
   let propagate = permute(match)
   let select = ''
   propagate.forEach(item => {
       let score = 0
       for(i=0; i<item.length; i+=2){
           let temp = [];
           temp.push(...item[i].split('-'))
           temp.push(...item[i+1].split('-'))
           if(temp.length === new Set(temp).size){
              score += 1
           }
      }
      if(score == 5){
          select = item
          // console.log(item) //it contains all possiblle combination, but we need only one
      }
   })
  //  console.log(select) //expected result
  
  /** Generate time scheduling concatenate with expected result */
   let dates = ['05-12-2022', '06-12-2022', '07-12-2022', '08-12-2022', '09-12-2022']
   let schedule = []
   dates.forEach((dat,ind) =>{
       schedule.push({[dat] : 'Day: '+ select[ind*2] + ', Night: ' + select[ind*2 + 1] })
   })
   console.log('Game Schedule: ')
   console.log(schedule)
   console.log('Thanks for your patience')