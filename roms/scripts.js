function getbuilds(flid) {

  let api = 'https://cors.io/?https://androidfilehost.com/api/?action=folder&flid=' + flid;
  let request = new XMLHttpRequest();
  request.open('GET', api);

  request.onload = function(){
    let file = JSON.parse(request.responseText);

    for(i = file.DATA.files.length - 1; i >= 0; i--){
        let afh = file.DATA.files[i];

        // Converte a data : "309425112" -> "06/05/2018" //
        let c_date = new Date(afh.upload_date * 1000);
        c_date.toLocaleString();
        let afh_date = moment(c_date).format("YYYY/MM/DD");

        // Converte o tamanho : byte -> MB //
        let afh_size = (afh.file_size / 1048576).toFixed(0) + "MB";
    
        // Gera os elementos do meu HTML //
        tbody_base = document.getElementById("tbody01");
        trbase = document.createElement("tr");
        tbody_base.appendChild(trbase);
      
        td01 = document.createElement("td");
        trbase.appendChild(td01);
        a01 = document.createElement("a");
        a01.innerHTML = afh.name
        a01.setAttribute("href", afh.url);
        td01.appendChild(a01);
      
        td02 = document.createElement("td");
        td02.innerHTML = afh_date;
        trbase.appendChild(td02);
      
        td03 = document.createElement("td");
        td03.innerHTML = afh_size
        trbase.appendChild(td03);
        
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, Option);
    };
};
    request.send();
};

function getlatest(rom, flid){
  let api = 'https://cors.io/?https://androidfilehost.com/api/?action=folder&flid=' + flid;
  let request = new XMLHttpRequest();
  request.open('GET', api);

  request.onload = function(){
    let file = JSON.parse(request.responseText);
    let afh = file.DATA.files[file.DATA.files.length - 1];
    
    // Tools
    let c_date = new Date(afh.upload_date * 1000);
    c_date.toLocaleString();
    let afh_date = moment(c_date).format("YYYY/MM/DD");
    let afh_size = (afh.file_size / 1048576).toFixed(0) + "MB";

    if (rom == "los") {
      tbody_base = document.getElementById("tbody-los");
    } else if (rom == "pe") {
      tbody_base = document.getElementById("tbody-pe");
    } else {
      tbody_base = document.getElementById("tbody-cypher");
    }

    trbase = document.createElement("tr");
    tbody_base.appendChild(trbase);
  
    td01 = document.createElement("td");
    trbase.appendChild(td01);
    a01 = document.createElement("a");
    a01.innerHTML = afh.name
    a01.setAttribute("href", afh.url);
    td01.appendChild(a01);
  
    td02 = document.createElement("td");
    td02.innerHTML = afh_date;
    trbase.appendChild(td02);
  
    td03 = document.createElement("td");
    td03.innerHTML = afh_size
    trbase.appendChild(td03);
    
    let elems = document.querySelectorAll('.collapsible');
    let instances = M.Collapsible.init(elems, Option);
  };
  request.send();
};
