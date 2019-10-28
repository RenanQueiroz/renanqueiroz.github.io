function getbuilds(flid) {
  let api = 'http://andersondev.000webhostapp.com/afh-proxy.php?action=folder&flid=' + flid;
  let request = new XMLHttpRequest();
  request.open('GET', api);
  request.onload = function(){
    let file = JSON.parse(request.responseText);
      for(i = file.DATA.files.length - 1; i >= 0; i--){
        let afh = file.DATA.files[i];
        let afh_date = convertdate(afh.upload_date);
        let afh_size = (afh.file_size / 1048576).toFixed(0) + " MB";
        tbody_base = document.getElementById("tbody01");
        globalapprends(afh.name, afh.url, afh_date, afh_size);
        collapsible();
        };
      };
  request.send();
};

function getlatest(rom, flid){
  let api = 'http://andersondev.000webhostapp.com/afh-proxy.php?action=folder&flid=' + flid;
  let request = new XMLHttpRequest();
  request.open('GET', api);

  request.onload = function(){
    let file = JSON.parse(request.responseText);
    let afh = file.DATA.files[file.DATA.files.length - 1];
    
    let afh_date = convertdate(afh.upload_date);
    let afh_size = (afh.file_size / 1048576).toFixed(0) + "MB";

    if (rom == "los") {
      tbody_base = document.getElementById("tbody-los");
    } else if (rom == "pe") {
      tbody_base = document.getElementById("tbody-pe");
    } else {
      tbody_base = document.getElementById("tbody-cypher");
    }
    globalapprends(afh.name, afh.url ,afh_date , afh_size);
    collapsible();
    };
    request.send();
};

function globalapprends(name, url, date, size){
  trbase = document.createElement("tr");
  tbody_base.appendChild(trbase);
  td01 = document.createElement("td");
  trbase.appendChild(td01);
  a01 = document.createElement("a");
  a01.innerHTML = name;
  a01.setAttribute("href", url);
  td01.appendChild(a01);
  td02 = document.createElement("td");
  td02.innerHTML = date;
  trbase.appendChild(td02);
  td03 = document.createElement("td");
  td03.innerHTML = size;
  trbase.appendChild(td03);
};

function convertdate(date){
  let c_date = new Date(date * 1000);
  c_date.toLocaleString();
  return moment(c_date).format("YYYY/MM/DD");
};

function collapsible(){
  let elems = document.querySelectorAll('.collapsible');
  let instances = M.Collapsible.init(elems, Option);
};
