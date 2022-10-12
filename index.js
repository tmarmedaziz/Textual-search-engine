
function load(query) {
  const url = "http://localhost:9200/flickrphotos/_search?q="
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      callback(xhr, query);
    }
  }

  xhr.open('GET', url+query, true);
  xhr.send('');
}

function callback(r_data, query){
  if (r_data.status == 200) {
    
    
    let data = JSON.parse(r_data.response);
    if (data.hits.hits.length == 0) {
      alert('No result for your query!');
    }else{
      page_head = `<div style=\"text-align: center;\">search for <strong>${query}:</strong></div>`;
      const new_page_head = document.createElement('div');
      new_page_head.innerHTML = page_head;
      const hide = document.getElementById('search');
      hide.parentNode.replaceChild(new_page_head, hide);

      let div = `<div class="cards">`;
      
      for (let index = 0; index < data.hits.hits.length; index++) {
        const image_data = data.hits.hits[index]._source;
        const image_url = "http://farm"+image_data.flickr_farm+".staticflickr.com/"+image_data.flickr_server+"/"+image_data.id+"_"+image_data.flickr_secret+".jpg";

        div += `<div class="card" ><img src="${image_url}" class="card-img-top" alt="..."></div>`;
        
      }
      div += `</div>`;

      var new_pic = document.createElement('div');
      new_pic.innerHTML = div;
      new_page_head.parentNode.appendChild(new_pic); 

    }
  }else{console.log(r_data.status);}
}


function get_value(){
  var val = document.getElementById('search-query').value;
  return val;
}

function search_input(){
  let query = get_value();
  if (query != '') {
    // const hide = document.getElementById('search');
    // hide.style.visibility = 'hidden';
    // const show = document.getElementById('final-search');
    // show.style.visibility = 'inherit';
    // const newItem = document.createElement('li');
    // newItem.innerHTML = '<a href="/products">Products</a>';

    // hide.parentNode.replaceChild(newItem, hide);

    load(query);
  }else{alert('No query entered')}
}

// load("tunis");