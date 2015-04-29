Table = {
		fillTable : function(){
			var tableBody = $( "#jobTableBody" );
			var bodyStr = "";
			
			for(var i = 0; i < Util.jobList.length; i++){
				var id = Util.jobList[i].ID;
				var q = Util.jobList[i].QUANTITY;
				var p = Util.jobList[i].PROFILE;
				var m1 = Util.jobList[i].M1.TIME;
				var m2 = Util.jobList[i].M2.TIME;
				var m3 = Util.jobList[i].M3.TIME;
				var started = Util.jobList[i].STARTED ? " disabled" : "";
			
				bodyStr += "<tr>"
					+ "<td>" + id + "</td>"
					+ "<td>" + q + "</td>"
					+ "<td>" + p + "</td>"
					+ "<td>" + m1 + "</td>"
					+ "<td>" + m2 + "</td>"
					+ "<td>" + m3 + "</td>"
					+ "<td><button class='remove-job-button' jobId='" + id + "'" + started + ">x</button></td>"
					+ "</tr>";
			}
			
			tableBody.html(bodyStr);
			
			$( ".remove-job-button" ).button();
			
			$( ".remove-job-button" ).button().on( "click", function() {
		    	Table.removeJob(this);
		    });
		},
		
		removeJob : function(btn){
			var jobId = $( btn ).attr( "jobId" );
			
			for(var i = 0; i < Util.jobList.length; i++){
				if(Util.jobList[i].ID == jobId){
					Util.jobList.splice(i, 1);
				}
			}
			
			ScheduleAlgorithm.scheduleJobList();
			this.fillTable();
			Chart.drawChart();
			
			// ja darbu saraksts ir tukðs, tad nodzçð laiku
			if(!Util.jobList.length){
				Util.timeCounter = 0;
				$( "#timeCounter" ).html(Util.timeCounter);
			}
		}
}