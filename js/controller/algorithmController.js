ScheduleAlgorithm = {
		scheduleJobList : function(){
			var startedJobList = [];
			var listA = [];
			var listB = [];
			
			for(var i = 0; i < Util.jobList.length; i++){
				var started = Util.jobList[i].STARTED;
				var g = Util.jobList[i].M1.TIME + Util.jobList[i].M2.TIME;
				var h = Util.jobList[i].M2.TIME + Util.jobList[i].M3.TIME;
				
				if(started){
					startedJobList.push(Util.jobList[i]);
				} else if(g < h){
					listA.push(Util.jobList[i]);
				} else if(g > h) {
					listB.push(Util.jobList[i]);
				} else {
					listA.push(Util.jobList[i]);
				}
			}
			
			listA.sort(function(a, b){
				return (a.M1.TIME + a.M2.TIME) - (b.M1.TIME + b.M2.TIME);
			});
			
			listB.sort(function(a, b){
				return (b.M2.TIME + b.M3.TIME) - (a.M2.TIME + a.M3.TIME);
			});
			
			Util.jobList = startedJobList.concat(listA, listB);
			ScheduleAlgorithm.setEndTimeForJobs();
		},
		
		setEndTimeForJobs : function(){
			for(var i = 0; i < Util.jobList.length; i++){
				var addedTime = Util.jobList[i].ADDED_TIME;
				if(i == 0){
					Util.jobList[i].M1.END_TIME = Util.jobList[i].M1.TIME;
					Util.jobList[i].M2.END_TIME = Util.jobList[i].M1.END_TIME + Util.jobList[i].M2.TIME;
					Util.jobList[i].M3.END_TIME = Util.jobList[i].M2.END_TIME + Util.jobList[i].M3.TIME;
				} else {
					Util.jobList[i].M1.END_TIME = Math.max(Util.jobList[i - 1].M1.END_TIME, Util.jobList[i].ADDED_TIME) + Util.jobList[i].M1.TIME;
					Util.jobList[i].M2.END_TIME = Math.max(Util.jobList[i].M1.END_TIME, Util.jobList[i - 1].M2.END_TIME) + Util.jobList[i].M2.TIME;
					Util.jobList[i].M3.END_TIME = Math.max(Util.jobList[i].M2.END_TIME, Util.jobList[i - 1].M3.END_TIME) + Util.jobList[i].M3.TIME;
				}
			}
		},
		
		checkForStartedJobs : function(){
			for(var i = 0; i < Util.jobList.length; i++){
				if(Util.jobList[i].M1.TIME != 0){ // ja tiek izmantota pirmā iekārta
					if(Util.timeCounter > (Util.jobList[i].M1.END_TIME - Util.jobList[i].M1.TIME)){
						Util.jobList[i].STARTED = true;
					} else {
						Util.jobList[i].STARTED = false;
					}
				} else { // ja netiek izmantota pirmā iekārta
					if(Util.jobList[i].M2.TIME != 0){ // ja tiek izmantota otrā iekārta
						if(Util.timeCounter > (Util.jobList[i].M2.END_TIME - Util.jobList[i].M2.TIME)){
							Util.jobList[i].STARTED = true;
						} else {
							Util.jobList[i].STARTED = false;
						}
					} else { // ja netiek izmantota otrā iekārta
						if(Util.timeCounter > (Util.jobList[i].M3.END_TIME - Util.jobList[i].M3.TIME)){
							Util.jobList[i].STARTED = true;
						} else {
							Util.jobList[i].STARTED = false;
						}
					}
				}
			}
		}
}