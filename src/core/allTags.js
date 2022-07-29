import jsonData from '../data/characters.json'

export const getAllTags = () => {
  const tags = [];
  jsonData.forEach(item => {
   if(item.tags){
    item.tags.forEach(tag=>{
      if(tags && !tags.includes(tag.tag_name)){
        tags.push(tag.tag_name);
      }
    })
   }
  });
  return tags;
}
