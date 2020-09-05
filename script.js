const colors = ["blue", "green", "magenta", "yellow", "gray", "orange", "purple", "navy", "tan", "papayaWhip", "darkSalmon","azure", "olive", "seaGreen", "lavender", "cyan", "peachPuff", "deepSkyBlue"]

var compounds = [];
var partition = [];
var compoundID=1;
var concentration = [];
let labeldata=[];
var calcdata = [];
var rettime=[];
const newCompound =  (ID)=> {
    const NC = `<fieldset><legend>Compound ${ID}</legend>
    <label for="c${ID}">Name:</label>
    <input type="text" name="compounds" id="c${ID}">
    <label for="kd${ID}">Kd</label>
    <input type="number" name="KD" id="kd${ID}" min="0" max="10" step="0.1">
    <label for="conc${ID}">c</label>
    <input type="number" name="concentration" id="conc${ID}" min="0" max="" value="1000">
    </fieldset>`;
    return NC;
}



var settings = {
        "Vc": 100,
        "SF":1.0,
        "F":10,
        "mode":"descending"


};

function retcalc(i_Kd, i_Vc, i_SF, i_flow) {
    return (i_Vc+(i_Kd-1)*i_Vc*(i_SF/100))/i_flow

}   

function pw_distort(i_retvol) {
    return Number((0.0011*i_retvol+0.1197)/2.35)
}

function peak_param(points,threshold){

    // felelsleges pontok eltávolítása
    let peak_points = [];
    peak_points = points.filter(p =>p[1]>threshold)

    const peak_start = peak_points[0];

    const peak_end = peak_points[peak_points.length-1];
    
    let area = 0;

    for (let index = 0; index < peak_points.length-1; index++) {
        area = area + (peak_points[index+1][0]-peak_points[index][0])*peak_points[index][1];
    }
    console.log(area);
    

}

function gauss(x, apex, width, height) {
    let y =height*Math.exp((-1)*Math.pow((x-apex),2)/(2*Math.pow(width,2)));
    // 1/(sd*Math.sqrt(2*Math.PI))*
    return y;
}
function populateData(array, datapoints, apex, width, flow, concentration, limit) {
    for (let index = 0; index < datapoints; index++) {
        let sum=0.0;
        for (let i = 0;i< apex.length;i++){
            sum=sum+gauss(index/datapoints*100 ,apex[i],pw_distort(width[i]*flow),concentration[i]);
            if (sum>limit) {
                sum=limit;
            }
        };

        array.push([index/datapoints*100, sum]);
        
    };
    
};

function populateData2(array, datapoints, apex, width, flow, concentration, limit) {
    let value=0;
    for (let index = 0; index < datapoints; index++) {
            
            value=gauss(index/datapoints*100 ,apex,pw_distort(width*flow),concentration);
            console.log(value);
            if (value>limit) {
                value=limit;
            
            };

        array.push([index/datapoints*100, value]);
        
    };
    
};
function draw(calcdata,labelarray,curves) {

   //törlés
   $('.labels').remove();
   $('svg').remove();


    //rajz

    const w = 600;
    const h = 600;
    const padding = 60;
    

    const xScale = d3.scaleLinear()
           .domain([0, d3.max(calcdata, (d) => d[0])])
           .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
           .domain([0, d3.max(calcdata, (d) => d[1])])
           .range([h - padding, padding]);

    const svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id","plot");
        

    svg.selectAll("circle")
    .data(calcdata)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy",(d) => yScale(d[1]))
    .attr("r", (d) => 1);


    var lineGenerator = d3.line()
        .x(function(d) {return xScale(d[0]);})
        .y(function(d) {return yScale(d[1]);})
        .curve(d3.curveCardinal);

    d3.select("svg")
        .append("path")
        .data([calcdata])
        .attr("class", "line")
        .attr("d", lineGenerator)

    for (let index = 0; index < curves.length; index++) {
        const element = curves[index];

        let c = svg.selectAll("g .g_curves")
                    .data([element])
                    .enter()
                    .append("g")
                    .attr("transform",function (d,i){ return "translate(0,0)";})
                    .attr("class","g_curves");
        c.selectAll("circle")
            .append("circle")
            .attr("cx", (d) => xScale(d[0]))
            .attr("cy",(d) => yScale(d[1]))
            .attr("r", (d) => 10)
            .style("fill",colors[index]);
        c.append("path")
            .attr("class", "line")
            .attr("d", lineGenerator)
            .style("stroke", colors[index])
            .style("fill",colors[index])
            .style("opacity", "10%")
            .on("mouseover", onMouseOver)
            .on("mouseout", onMouseOut);
            
        }
    //Labels
    var labels = svg.selectAll(".g_labels")
                    .data(labelarray)
                    .enter()
                    .append("g")
                    .attr("transform",function (d,i){ return "translate(0,0)";})
                    .attr("class","g_labels")
                    .attr("id", function (d,i){return "g_label_"+i})
                    .style("opacity","100%");



 labels.append("text")
        .text(function (d){return d.name})
        .attr("x", function(d){return (d.retention/100)*(w-2*padding)+padding+15})
        .attr("y", 300)
        .attr("stroke","black")
        .attr("class","labels");


    function onMouseOver(d, i) {
    
        d3.select(this).style("opacity", "50%");
       // d3.select("#g_label_"+i).style("opacity", "100%")

    }


    function onMouseOut(d, i) {
    
        d3.select(this).style("opacity", "10%");
        //d3.select("#g_label_"+i).style("opacity", "0%")
     
     
    }

     
    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);;

    svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);


    svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis)

    d3.select("path").style("stroke","black").style("fill","none");


    // tengely feliratok

    //x
    svg.append("text")
        .attr("transform", "translate("+ (w/2)+ " ," + (h)+ ")")
        .style("text-anchor", "middle")
        .text("Retention Time [min]")
    // y
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y",0) 
        .attr("x", 0-h/2+padding)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Response")


}
$('#btnAdd').click(() => {
    compoundID++;
    $("#settings").append(newCompound(compoundID));
});

/*
$('#btnCalc').click(() => {
    //előző adatok ürítése
    compounds.length=0;
    calcdata.length=0;
    partition.length=0;
    concentration.length=0;
    rettime.length=0;
  
    //adatok begyűjtése
    settings.Vc=$('#colVol').val();
    settings.SF=$('#SF').val();
    settings.F=$('#F').val();
    settings.mode=$('#mode').val();
    $('input[name="compounds"]').each(function(){
        compounds.push($(this).val());
    });

    $('input[name="KD"]').each(function(){
        if (settings.mode=="asc") {
            partition.push(1/$(this).val());
        } else {
            partition.push($(this).val());
        }
      
    });

    $('input[name="concentration"]').each(function(){
        concentration.push($(this).val());
    });
    // megoszlásból retenciós idő átszámolása
    partition.forEach(element => {
        rettime.push(retcalc(Number(element),Number(settings.Vc),Number(settings.SF),Number(settings.F)))
    });
    // Adatok generálása a plothoz
    populateData(calcdata, 1000,rettime,rettime,settings.F,concentration,100);
    for (let index = 0; index < compounds.length; index++) {
        let labels = {};
        labels.name=compounds[index];
        labels.retention=rettime[index];
        labeldata.push(labels);
    }

    console.log(labeldata);

    console.log(calcdata);

    draw(calcdata, labeldata);
    
  
  });
 
console.log(rettime);
*/
$(".parameters").change(function(){
        //előző adatok ürítése
        compounds.length=0;
        calcdata.length=0;
        partition.length=0;
        concentration.length=0;
        rettime.length=0;
        labeldata.length=0;
      
        //adatok begyűjtése
        settings.Vc=$('#colVol').val();
        settings.SF=$('#SF').val();
        settings.F=$('#F').val();
        settings.mode=$('#mode').val();
        console.log(settings.mode);
        $('input[name="compounds"]').each(function(){
            compounds.push($(this).val());
        });
    
        $('input[name="KD"]').each(function(){
            if (settings.mode=="asc") {
                partition.push(1/$(this).val());
            } else {
                partition.push($(this).val());
            }
          
        });
    
        $('input[name="concentration"]').each(function(){
            concentration.push($(this).val());
        });
        // megoszlásból retenciós idő átszámolása
        partition.forEach(element => {
            rettime.push(retcalc(Number(element),Number(settings.Vc),Number(settings.SF),Number(settings.F)))
        });
        // Adatok generálása a plothoz
        populateData(calcdata, 1000,rettime,rettime,settings.F,concentration,100);
       
        var curves = [];
        var peaks=[];
        for (let index = 0; index < compounds.length; index++) {
            let labels = {};
            let curve_points = [];
            labels.name=compounds[index];
            labels.retention=rettime[index];

            labeldata.push(labels);

            populateData2(curve_points, 1000,rettime[index],rettime[index],settings.F,concentration[index],100)
            labels.peakpoints=curve_points

            labels.maxvalue=gauss(rettime[index] ,rettime[index],pw_distort(rettime[index]*settings.F),concentration[index])



            peaks.push(labels);
            console.log(peaks);

            curves.push(curve_points);
        }
    
        console.log(labeldata);
    
        console.log(calcdata);
        console.log(curves);
        draw(calcdata, labeldata, curves);

        
      peak_param(peaks[0].peakpoints,10);
      console.log(pw_distort(peaks[0].retention*settings.F))   
     
});