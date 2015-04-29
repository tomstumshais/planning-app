Main = {
		onInit : function(){
			$( "#addJobBtn, #timeSimBtn, .remove-job-button" ).button();
			
			$( "#jobQuantity" ).spinner({
				min: 1,
			    max: 5
			});
			
			$( "#jobProfile" ).selectmenu({
				width: 90
			});
			
			$( "#jobWorkstations" ).buttonset();
			
			$( "#addJobDialog" ).dialog({
		    	autoOpen: false,
		        height: 330,
		        width: 430,
		        modal: true,
		        buttons: {
		        	"Pievienot" : function() {
		        		Main.addJob();
		        	},
		        	"Atcelt" : function() {
		        		Main.closeAddJobDialog();
		        	}
		        },
		        open: function(){
		        	$( "#warningText" ).hide();
		        }
		    });
		    
		    $( "#addJobBtn" ).button().on( "click", function() {
		    	Main.openAddJobDialog();
		    });
		    
		    $( "#timeSimBtn" ).button().on( "click", function() {
		    	Main.timeStepSimulation();
		    });
		    
		    Chart.drawChart();
		},
		
		openAddJobDialog : function(){
			$( "#addJobDialog" ).dialog( "open" );
		},
		
		closeAddJobDialog : function(){
			$( "#addJobDialog" ).dialog( "close" );
		},
		
		addJob : function(){
			var jobExists = false;
			var quantity = parseInt($( "#jobQuantity" ).val());
			var profile = $( "#jobProfile" ).val();
			var m1 = $( "#check1" ).is(':checked');
			var m2 = $( "#check2" ).is(':checked');
			var m3 = $( "#check3" ).is(':checked');
			
			if(!m1 && !m2 && !m3){
				$( "#warningText" ).show();
				return;
			}
			
			// ja vienāds darbs eksistē, tad apvieno tos
			for(var i = 0; i < Util.jobList.length; i++){
				if(Util.jobList[i].PROFILE == profile && Util.jobList[i].M1.USE == m1 
						&& Util.jobList[i].M2.USE == m2 && Util.jobList[i].M3.USE == m3 && !Util.jobList[i].STARTED){
					Util.jobList[i].QUANTITY = Util.jobList[i].QUANTITY + quantity;
					Util.jobList[i].M1.TIME = m1 ? Util.jobList[i].QUANTITY * Util.profileTypes[profile].m1 : 0;
					Util.jobList[i].M2.TIME = m2 ? Util.jobList[i].QUANTITY * Util.profileTypes[profile].m2 : 0;
					Util.jobList[i].M3.TIME = m3 ? Util.jobList[i].QUANTITY * Util.profileTypes[profile].m3 : 0;
					jobExists = true;
				}
			}
			
			// ja vienāds darbs neeksistē, tad pievieno jaunu
			if(!jobExists){
				var jobObj = {
						"ID" : Util.jobId++,
						"QUANTITY" : quantity,
						"PROFILE" : profile,
						"STARTED" : false,
						"ADDED_TIME" : Util.timeCounter,
						"M1" : {
							"USE" : m1,
							"TIME" : m1 ? 1 + quantity * Util.profileTypes[profile].m1 : 0,
							"END_TIME" : 0
						},
						"M2" : {
							"USE" : m2,
							"TIME" : m2 ? 1 + quantity * Util.profileTypes[profile].m2 : 0,
							"END_TIME" : 0
						},
						"M3" : {
							"USE" : m3,
							"TIME" : m3 ? 10 + quantity * Util.profileTypes[profile].m3 : 0,
							"END_TIME" : 0
						}
				};
				Util.jobList.push(jobObj);
			}
			
			ScheduleAlgorithm.scheduleJobList();
			Table.fillTable();
			Chart.drawChart();
			
			$( "#addJobDialog" ).dialog( "close" );
		},
		
		timeStepSimulation : function(){
			if(Util.jobList.length){
				Util.timeCounter = Util.timeCounter + 10;
				$( "#timeCounter" ).html(Util.timeCounter);
				ScheduleAlgorithm.checkForStartedJobs();
				Table.fillTable();
				Chart.drawChart();
			} else {
				Util.timeCounter = 0;
				$( "#timeCounter" ).html(Util.timeCounter);
			}
		}
}