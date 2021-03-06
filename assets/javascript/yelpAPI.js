            var resultArray;
            var divArray;
            var near; 
            var num;

                $('#getResults').on('click', function(){

                    $('#displayResults').empty();
                    resultArray = new Array;
                    divArray = new Array;

                // This line of code will grab the input from the textbox...
                near = $('#zipCodeInput').val().trim();

                if (near.length != 5 || isNaN(near))

                {
                    $('#displayResults').append(" Not a valid zip Code !");
                    near = 0;
                }


                console.log(near);

                var terms = 'Food Trucks';

                var parameters = [];
                parameters.push(['term', terms]);
                parameters.push(['location', near]);
                parameters.push(['callback', 'cb']);
                parameters.push(['oauth_consumer_key', auth.consumerKey]);
                parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
                parameters.push(['oauth_token', auth.accessToken]);
                parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

                var message = {
                    'action' : 'https://api.yelp.com/v2/search',
                    'method' : 'GET',
                    'parameters' : parameters
                };


                OAuth.setTimestampAndNonce(message);
                OAuth.SignatureMethod.sign(message, accessor);
        
                var parameterMap = OAuth.getParameterMap(message.parameters);
                    

                 $.ajax({
                    'url' : message.action,
                    'data' : parameterMap,
                    'dataType' : 'jsonp',
                    'jsonpCallback' : 'cb',
                    'cache': true
                })

                .done(function(data, textStatus, jqXHR) {
                      //  console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                    }
                )
                .fail(function(jqXHR, textStatus, errorThrown) {
                                    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                        }
                );
                  return false;
                })

                function clicklistener() {

                
                              $('.imgDivClass1, .imgDivClass2').on("click",function()

                              {
                                    window.open(resultArray[$(this).attr("data-name")].link,'_blank');
                              });     

                             $('.bName').on("click",function()

                              {
                                    console.log("you clicked on title");
                                    window.open(resultArray[$(this).attr("data-name")].link,'_blank');
                              });   

               }

            function cb(data) {        
                    console.log("cb: " + JSON.stringify(data));
                    //console.log( "data : " + JSON.stringify(data));
                    console.log( "data : " + JSON.stringify(data.businesses.length));
                     console.log( "data : " + JSON.stringify(data.businesses[0].rating));
                     console.log( "data : " + JSON.stringify(data.businesses[0].location));
                     console.log( "latitude : " + JSON.stringify(data.businesses[0].location.coordinate.latitude));
                     console.log( "longitude : " + JSON.stringify(data.businesses[0].location.coordinate.longitude));
                     console.log( "data : " + JSON.stringify(data.businesses[0].id));
                     console.log( "data : " + JSON.stringify(data.businesses[0].price));
                     console.log( "data : " + JSON.stringify(data.businesses[0].image_url));
                     console.log( "data : " + JSON.stringify(data.businesses[0].rating_img_url));


                      $('#displayResults').empty();

                      if (data.businesses.length <10 )
                      {
                        num = data.businesses.length;
                      } 

                      else  
                      {
                        num = 10;
                      }

                     for (var i = 0; i<num; i++)
                      {
                        resultObject = 

                         {  id: data.businesses[i].id, 
                            resultImage: data.businesses[i].image_url,
                            rating : data.businesses[i].rating,
                            ratingImg : data.businesses[i].rating_img_url_large,
                            location : data.businesses[i].location.display_address,
                            ratingDesc: data.businesses[i].snippet_text,
                            link: data.businesses[i].mobile_url,
                            foodCategory: data.businesses[i].categories[i],
                            phone: data.businesses[i].display_phone,
                            lat: data.businesses[i].location.coordinate.latitude,
                            lng: data.businesses[i].location.coordinate.longitude
                         };

                        resultObject.id = resultObject.id.split('-').join(' ');
                        resultObject.id = resultObject.id.toUpperCase();

        //$(names).addClass("nam");
                    var businessName = resultObject.id;
                       // $(resultObject.id).addClass("bName");
                       $(businessName).addClass("bName");
                       $(businessName).attr('data-name', i); 

                        
                    var image1 = $('<img class = "imgDivClass1">').attr('src', resultObject.resultImage);
                        image1.attr('data-name', i);  
                        console.log(image1.attr('data-name'));
                      

                    var image2 = $('<img class = "imgDivClass2">').attr('src',resultObject.ratingImg);
                        image2.attr('data-name', i);

                    console.log( "URL : " + resultObject.link);

                    resultArray.push(resultObject);

                   //divArray[i] = $("<div class = 'titleDivClass'>").append(businessName);

                   divArray[i] = $("<div class = 'outerDiv'>");

                   businessNameDiv = $("<div class = 'titleDivClass'>").append(businessName);
                    divArray[i].append(businessNameDiv);

                    imgDiv = $('<div >').append(image1);
                    divArray[i].append(imgDiv);

                    ratingDiv = $("<div class = 'textclass' >").append("Rating: " + resultObject.rating);
                    divArray[i].append(ratingDiv);

                    ratingImgDiv = $("<div class = 'wrapping' >").append(image2);
                    divArray[i].append(ratingImgDiv);

                    locationDiv = $("<div class = 'textclass' >").append("Location: " + resultObject.location);
                    divArray[i].append(locationDiv);

                    ratingDescDiv = $("<div class = 'textclass' >").append("What People Said: " + resultObject.ratingDesc);
                    divArray[i].append(ratingDescDiv);

                    categoryDiv = $("<div class = 'textclass' >").append("Food Category: " + resultObject.foodCategory);
                     divArray[i].append(categoryDiv);

                    phoneDiv = $("<div class = 'textclass' >").append("Phone #: " + resultObject.phone);
                    divArray[i].append(phoneDiv);
                  
                     $('#displayResults').append(divArray[i]); 

                    //code for adding markers
                    var newPos = {
                      lat: resultObject.lat,
                      lng: resultObject.lng
                    } 

                    addNewMarker(newPos, i.toString());
                }

                clicklistener();


            }
                var auth = {
                    consumerKey : "tdDeaUZsKmwWPlAHcAXrBQ",
                    consumerSecret : "Mc5OMuJ5LUzJ4H8i7olOPE0eBxo",
                    accessToken : "vxc5hq9rwljvRnhke3uz08t3LPTvTKIt",
                    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                    // You wouldn't actually want to expose your access token secret like this in a real application.
                    accessTokenSecret : "NGYjH8ZYKU-lSjHuD_vFTfqMsvg",
                    serviceProvider : {
                        signatureMethod : "HMAC-SHA1"
                                      }
                };
        
                var accessor = {
                    consumerSecret : auth.consumerSecret,
                    tokenSecret : auth.accessTokenSecret
                };
