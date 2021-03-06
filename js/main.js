var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope) {
		
		$scope.applyzebrarow		= false;
		$scope.highlightrowcolor 	= "orange"; 
		$scope.stickyheader 	 	= false;
		$scope.tablebordercolor		= '#000';
		
		$scope.leftheaderbgcolor 	= "";
		$scope.leftheaderfontsize 	= 10;
		$scope.leftheadertablecolor	= '#FFF';
		$scope.lefttablebordercolor	= '#FFF';
		
		$scope.topheaderbgcolor 	= "";
		$scope.topheaderfontsize 	= 10;
		$scope.topheadertablecolor	= '#FFF';
		$scope.toptablebordercolor	= '#FFF';
				
		$scope.columntotalbgcolor 	= "";
		$scope.columntotalfontsize 	= 10;
		$scope.columntotaltablecolor= '#FFF';
		
		$scope.grandtotalbgcolor 	= "";
		$scope.grandtotalfontsize 	= 10;
		$scope.grandtotaltablecolor= '#FFF';
		 
		$scope.rowTotals = true;
		$scope.colTotals = true;
		
		$scope.showRtotal =  function(val){
			$scope.rowTotals = val;
		}
		
		$scope.showCtotal =  function(val){
			$scope.colTotals = val;
		}
		
		$scope.applyGrandTotalBGColor =  function(val){ 		
			$scope.grandtotalbgcolor = val;
			if(val!=''){  
				$("#output").find('.pvtTable').children('tbody').children('tr').find("td.pvtGrandTotal").css({
				 'background-color': $scope.grandtotalbgcolor,
				 'color': $scope.grandtotaltablecolor,
				 'font-size' : $scope.grandtotalfontsize + 'px'
				});
			} 
		}
		
		$scope.applyColumnTotalBGColor =  function(val){ 		
			$scope.columntotalbgcolor = val;		
			if(val!=''){  
				
				$("#output").find('.pvtTable').children('tbody').children('tr').find("td.rowTotal").each(function (){
					$(this).css({
					 'background-color': $scope.columntotalbgcolor,
					 'color': $scope.columntotaltablecolor,
					 'font-size' : $scope.columntotalfontsize + 'px'
					});
				});
		
				$("#output").find('.pvtTable').children('tbody').children('tr').find("th.pvtTotalLabel").css({
						 'background-color': $scope.columntotalbgcolor,
						 'color': $scope.columntotaltablecolor,
						 'font-size' : $scope.columntotalfontsize + 'px'
				});
				
				$("#output").find('.pvtTable').children('thead').children('tr').find("th.pvtTotalLabel").css({
						 'background-color': $scope.columntotalbgcolor,
						 'color': $scope.columntotaltablecolor,
						 'font-size' : $scope.columntotalfontsize + 'px'
				}); 	
				
				$("#output").find('.pvtTable').children('tbody').children('tr').find("td.colTotal").each(function (){
						$(this).css({
						 'background-color': $scope.columntotalbgcolor,
						 'color': $scope.columntotaltablecolor,
						 'font-size' : $scope.columntotalfontsize + 'px'
						});
				}); 
				
				
				
				
			}
		}	

		$scope.applyZebra =  function(val){  
			$scope.applyzebrarow = val
			if($scope.applyzebrarow){
				$("#output").find('.pvtTable tbody tr:nth-child(even)').find('.pvtVal').each(function (){								 
					$(this).css('background-color','#EFEFEF');			 			
				});
			}else{
				$("#output").find('.pvtTable tbody tr:nth-child(even)').find('.pvtVal').each(function (){								 
					$(this).css('background-color','#FFF');			 			
				}); 
			}
		}	
		
		$scope.applySticky =  function(val){ 
			$scope.stickyheader = val
			if($scope.stickyheader){ 
				$("#output").find('.pvtTable').children('thead').css({ 
					"position": "sticky",
					"top":'-1px' 
				});
			}else{
				$("#output").find('.pvtTable').children('thead').css({ 
					 "position": "",
				});
			}
			
		}
		
		$scope.applyLeftLabelBGColor =  function(val){ 
			$scope.leftheaderbgcolor = val;		
			if(val!=''){ 
				$("#output").find('.pvtTable').children('tbody').children('tr').find('th').each(function (){
					$(this).css({
						 'background-color': $scope.leftheaderbgcolor,
						 'color': $scope.leftheadertablecolor,
						 'font-size' : $scope.leftheaderfontsize + 'px',
						 'border': '1px solid '+$scope.lefttablebordercolor
					});
				 });
			 }
		} 
		
		$scope.applyTopLabelBGColor =  function(val){ 
			$scope.topheaderbgcolor = val;		
			if(val!=''){ 
				$("#output").find('.pvtTable').children('thead').children('tr').find('th').each(function (){
					
					$(this).css({
						 'background-color': $scope.topheaderbgcolor,
						 'color': $scope.topheadertablecolor,
						 'font-size' : $scope.topheaderfontsize + 'px',
						 'border': '1px solid '+$scope.toptablebordercolor
					}); 
				});
			 }
		}
		
		$scope.applyHighlightColor =  function(val){ 
			$scope.highlightrowcolor = val 
		} 
		
		$scope.rgbToHex = function (colorval){
			   var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			   if(parts){
				  delete(parts[0]);
				  for (var i = 1; i <= 3; ++i) {
					parts[i] = parseInt(parts[i]).toString(16);
					if (parts[i].length == 1) parts[i] = '0' + parts[i];
				  }
				  color = '#' + parts.join('');
				  return color;
			  }
		} 		
		
		let rendererOptions = {table: {rowTotals: $scope.rowTotals, colTotals: $scope.colTotals}}; 
		$.pivotUtilities.tipsData = data;  
		$("#output").pivotUI(
			$.pivotUtilities.tipsData, {
				rows				: ['City','Country'], 
				cols				: ['State','Material_Category'], 
				vals				: ['Material_Rate'],
				aggregatorName		: "Sum",
				rendererName		: "Table", 
				autoSortUnusedAttrs	: false,
				exclusions			: {},
				hiddenAttributes	: [],  
				rendererOptions		: rendererOptions, 
				derivedAttributes   : {},			
				colOrder			: 'key_a_to_z',	
				rowOrder			: 'key_a_to_z',
				sorters				: {}, 
				showUI				:false,
				onRefresh: function(config) { 
					$("#output").find('.pvtVal').click(function(){  
						 if($scope.rgbToHex($(this).css("background-color"))=='#ffffff'){
							$(this).css("background-color", $scope.highlightrowcolor);
							$(this).siblings('td.pvtVal').css("background-color", $scope.highlightrowcolor);
						  }else{
							$(this).css("background-color", '#ffffff');
							$(this).siblings('td.pvtVal').css("background-color", '#ffffff');	
						  }	
					}); 
					 
					  	
					 var pivotconfig = JSON.parse(JSON.stringify(config)); 
					 
					 var getcolslength = pivotconfig.cols.length;
					 
					 var totalcols 		= $("#output").find('.pvtTable').data('numcols'); 	
					 var getfirstcols 	= [];
					 var getsecondcols 	= [];
					 var getthirdcols 	= [];
					 
					 if(getcolslength==1){  
						$("#output").find('.pvtTable').children('thead').children('tr').eq(0).find("th.pvtColLabel").each(function (){ 
								getfirstcols.push(parseInt($(this).attr('colspan')));
						}); 
					 }

					 if(getcolslength==2){
						 
						$("#output").find('.pvtTable').children('thead').children('tr').eq(0).find("th.pvtColLabel").each(function (){ 
								getfirstcols.push(parseInt($(this).attr('colspan')));
						});
						 
						
						$("#output").find('.pvtTable').children('thead').children('tr').eq(1).find("th.pvtColLabel").each(function (){ 
								getsecondcols.push(parseInt($(this).attr('colspan')));
						});
					 }	
					 
					 if(getcolslength==3){
						 
						$("#output").find('.pvtTable').children('thead').children('tr').eq(0).find("th.pvtColLabel").each(function (){ 
								getfirstcols.push(parseInt($(this).attr('colspan')));
						}); 
						
						$("#output").find('.pvtTable').children('thead').children('tr').eq(1).find("th.pvtColLabel").each(function (){ 
								getsecondcols.push(parseInt($(this).attr('colspan')));
						}); 
						
						$("#output").find('.pvtTable').children('thead').children('tr').eq(2).find("th.pvtColLabel").each(function (){ 
								getthirdcols.push(parseInt($(this).attr('colspan')));
						}); 
						 
					 } 
						//  console.log(totalcols);
						//  console.log(getfirstcols);
						//  console.log(getsecondcols);
						//  console.log(getthirdcols);
						
						var collectoddeven = [];

						for(var c1=0;c1<getfirstcols.length;c1++){
							var getindexval = getfirstcols[c1];
							if(c1 % 2 === 0){								 
							
							 $("#output").find('.pvtTable').children('thead').children('tr').eq(0).find("th.pvtColLabel").eq(c1).css("background-color", '#FFFF01');					
								for(var c2=0;c2<getindexval;c2++){
									collectoddeven.push('#FFFF01');
								}								
							}else{
								for(var c2=0;c2<getindexval;c2++){
									collectoddeven.push('');
								}
							}
						}
						
						for(var c3=0;c3<collectoddeven.length;c3++){
							
							if(getcolslength==2){							
								$("#output").find('.pvtTable').children('thead').children('tr').eq(1).find("th.pvtColLabel").eq(c3).css("background-color", collectoddeven[c3]);  
							}
							
							if(getcolslength==3){							
								$("#output").find('.pvtTable').children('thead').children('tr').eq(2).find("th.pvtColLabel").eq(c3).css("background-color", collectoddeven[c3]);  
							}
						}
						
						var temparray = [];
						
						for(var c4=0;c4<getfirstcols.length;c4++){
							
							var getindex = getfirstcols[c4];
							
							var tempar = [];
							
							var total = 0;
							
							for (var c5=0;c5<getindex;c5++){ 								
								tempar.push(getsecondcols[c5]);		
								
								total = total+getsecondcols[c5];
								if(total==getindex){
									break;
								}
	
							}
							
							var total = 0;
							for (var c5=0;c5<getindex;c5++){ 
								total = total+getsecondcols[c5];
								getsecondcols.shift();
								if(total==getindex){
									break;
								}	
								
							} 
							 temparray[c4] = tempar;	 
						
						}
						
						 
						var collectoddeven2 = [];
						 
						for(var c6=0;c6<temparray.length;c6++){
							
							var getindexval = temparray[c6]; 
							if(c6 % 2 === 0){ 
							
								for(var c2=0;c2<getindexval.length;c2++){
									collectoddeven2.push('#FFFF01');
								}	
								  
							}else{
							
								for(var c2=0;c2<getindexval.length;c2++){
									collectoddeven2.push('');
								}
								
							}
						}
						
						
						 for(var c3=0;c3<collectoddeven2.length;c3++){ 
							
							if(getcolslength==3){	
								$("#output").find('.pvtTable').children('thead').children('tr').eq(1).find("th.pvtColLabel").eq(c3).css("background-color", collectoddeven2[c3]);  
							}
						}
					 
					
				},
				renderers: $.extend(
					$.pivotUtilities.renderers, 
					$.pivotUtilities.plotly_renderers, 
					$.pivotUtilities.export_renderers, 
					$.pivotUtilities.c3_renderers,
					$.pivotUtilities.aggregatorTemplates
					 
				) 
		},true);  
		  
	});	