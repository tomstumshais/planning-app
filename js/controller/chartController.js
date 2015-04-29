Chart = {
		chartWidth : 1200, // datu attēlošanas bloka platums
		machinesNameWidth : 80, // iekārtu nosaukumu platums
		chartHeight : 350, // diagrammas augstums
		machines : ["Zāģis", "Ēvele", "Frēze"], // iekārtas
		rowHeight : 100, // vienas rindas augstums
		headerHeight : 40, // galvenes augstums
		jobBlockHeight : 40, // darba bloka augstums
		
		drawChart : function(){
		    var l = Util.jobList.length,
		    maxTime = 0;
		    
		    if(l){
		    	maxTime = Util.timeCounter > Util.jobList[l - 1].M3.END_TIME ? Util.timeCounter : Util.jobList[l - 1].M3.END_TIME;
		    } else {
		    	maxTime = 100;
		    }
		    
		    var onePiece = parseInt(Chart.chartWidth / maxTime);
		    
		    // chart box selection
		    $( "#chartContainer" ).empty();
			var chart = d3.select("#chartContainer")
				.append('svg')
				.attr('class', 'chart-container')
				.attr('width', Chart.machinesNameWidth + Chart.chartWidth + 1)
				.attr('height', Chart.chartHeight);
			
			this.drawMachineNames(chart);
			this.drawChartGridLines(chart, onePiece, maxTime);
			
			chart.append("g").attr("class", "chart");
			this.drawMachineAJobs(chart, onePiece);
			this.drawMachineBJobs(chart, onePiece);
			this.drawMachineCJobs(chart, onePiece);
		},
		
		drawMachineNames : function(chart){
			var y = Chart.headerHeight;
			
			chart.append("g").attr("class", "chart-labels");
			for(var i = 0; i < Chart.machines.length; i++){
				// uzzīmē iekārtas nosaukumu
				chart.select("g.chart-labels").append("text")
					.attr("class", "chart-label-text")
					.attr("x", 15)
					.attr("y", y + 50)
					.attr("dy", ".36em")
					.attr("text-anchor", "start")
					.text(Chart.machines[i]);
				
				y = y + Chart.rowHeight;
			}
		},
		
		drawMachineAJobs : function(chart, onePiece){
			var y = Chart.headerHeight + 33;
			
			for(var i = 0; i < Util.jobList.length; i++){
				if(Util.jobList[i].M1.USE){
					var jobTime = Util.jobList[i].M1.TIME;
					var endTime = Util.jobList[i].M1.END_TIME;
					var jobId = Util.jobList[i].ID;
					
					chart.select("g.chart").append("rect")
						.attr("class", "job-block")
						.attr("y", y)
						.attr("width", function(d){
							return onePiece * jobTime;
						})
						.attr("x", function(d){
							return Chart.machinesNameWidth + onePiece * (endTime - jobTime);
						})
						.attr("height", Chart.jobBlockHeight);
			
					chart.select("g.chart").append("text")
						.attr("class", "job-text")
						.attr("x", function(d){
							return Chart.machinesNameWidth + onePiece * (endTime - (jobTime / 2));
						})
						.attr("y", y + Chart.jobBlockHeight / 2)
						.attr("dy", ".36em")
						.attr("text-anchor", "middle")
						.text(jobId);
				}
			}
		},
		
		drawMachineBJobs : function(chart, onePiece){
			var y = Chart.headerHeight + 133;
			
			for(var i = 0; i < Util.jobList.length; i++){
				if(Util.jobList[i].M2.USE){
					var jobTime = Util.jobList[i].M2.TIME;
					var endTime = Util.jobList[i].M2.END_TIME;
					var jobId = Util.jobList[i].ID;
					
					chart.select("g.chart").append("rect")
						.attr("class", "job-block")
						.attr("y", y)
						.attr("width", function(d){
							return onePiece * jobTime;
						})
						.attr("x", function(d){
							return Chart.machinesNameWidth + onePiece * (endTime - jobTime);
						})
						.attr("height", Chart.jobBlockHeight);
			
					chart.select("g.chart").append("text")
						.attr("class", "job-text")
						.attr("x", function(d){
							return Chart.machinesNameWidth + onePiece * (endTime - (jobTime / 2));
						})
						.attr("y", y + Chart.jobBlockHeight / 2)
						.attr("dy", ".36em")
						.attr("text-anchor", "middle")
						.text(jobId);
				}
			}
		},
		
		drawMachineCJobs : function(chart, onePiece){
			var y = Chart.headerHeight + 233;
			
			for(var i = 0; i < Util.jobList.length; i++){
				if(Util.jobList[i].M3.USE){
					var jobTime = Util.jobList[i].M3.TIME;
					var endTime = Util.jobList[i].M3.END_TIME;
					var jobId = Util.jobList[i].ID;
					
					chart.select("g.chart").append("rect")
						.attr("class", "job-block")
						.attr("y", y)
						.attr("width", function(d){
							return onePiece * jobTime;
						})
						.attr("x", function(d){
							return Chart.machinesNameWidth + onePiece * (endTime - jobTime);
						})
						.attr("height", Chart.jobBlockHeight);
			
					chart.select("g.chart").append("text")
						.attr("class", "job-text")
						.attr("x", function(d){
							return Chart.machinesNameWidth + onePiece * (endTime - (jobTime / 2));
						})
						.attr("y", y + Chart.jobBlockHeight / 2)
						.attr("dy", ".36em")
						.attr("text-anchor", "middle")
						.text(jobId);
				}
			}
		},
		
		drawChartGridLines : function(chart, onePiece, maxTime){
			// diagrammas līniju zīmēšana
			var gridColor = "lightgrey";
			var mainColor = "black";
			var strokeWidth = 1;
			var opacity = 1;
			var fullWidth = Chart.machinesNameWidth + Chart.chartWidth;
			var time = 0;
			
			chart.append("g").attr("class", "lines");
			for (var i = Chart.machinesNameWidth; i < fullWidth; i = i + 10*onePiece) {
				if(i != Chart.machinesNameWidth){
					chart.select("g.lines").append("line")
			        	.attr("x1", i)
			        	.attr("y1", Chart.headerHeight)
			        	.attr("x2", i)
			        	.attr("y2", Chart.chartHeight - 10)
			        	.style("stroke", gridColor)
			        	.style("stroke-width", strokeWidth)
			        	.style("opacity", opacity);
					
					chart.select("g.lines").append("line")
		        		.attr("x1", i)
		        		.attr("y1", Chart.headerHeight - 5)
		        		.attr("x2", i)
		        		.attr("y2", Chart.headerHeight)
		        		.style("stroke", mainColor)
		        		.style("stroke-width", strokeWidth)
		        		.style("opacity", opacity);
					
					if(Util.timeCounter < 400 && maxTime < 400){
						chart.select("g.lines").append("text")
							.attr("class", "lines-text")
							.attr("x", i)
							.attr("y", Chart.headerHeight - 15)
							.attr("dy", ".36em")
							.attr("text-anchor", "middle")
							.text(time);
					}
				} else {
					chart.select("g.lines").append("line")
		        		.attr("x1", i)
		        		.attr("y1", Chart.headerHeight)
		        		.attr("x2", i)
		        		.attr("y2", Chart.chartHeight - 10)
		        		.style("stroke", mainColor)
		        		.style("stroke-width", strokeWidth)
		        		.style("opacity", opacity);
				}
				time += 10;
			}
			
			chart.select("g.lines").append("line")
	        	.attr("x1", 0)
	        	.attr("y1", Chart.headerHeight)
	        	.attr("x2", fullWidth)
	        	.attr("y2", Chart.headerHeight)
	        	.style("stroke", mainColor)
	        	.style("stroke-width", strokeWidth)
	        	.style("opacity", opacity);
			
			if(Util.timeCounter){
				var i = Chart.machinesNameWidth + Util.timeCounter*onePiece;
				chart.select("g.lines").append("line")
	        		.attr("x1", i)
	        		.attr("y1", Chart.headerHeight)
	        		.attr("x2", i)
	        		.attr("y2", Chart.chartHeight - 10)
	        		.style("stroke", mainColor)
	        		.style("stroke-width", strokeWidth)
	        		.style("opacity", opacity);
			}
		}
}