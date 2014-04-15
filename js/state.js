setTimeout(function() {

    QuotePhoto.stateManager = Ember.StateManager.create({
        rootElement: '#main',
        initialState: 'showPhotoView',
        

        showPhotoView: Ember.ViewState.create({
            enter: function(stateManager) {
                this._super(stateManager);
                loadPhotos();
                loadQuotes();
            },
            
            view: Ember.ContainerView.create({
                childViews: ['controlsView', 'photoListView', 'selectedPhotoView', 'quoteView'],
                //'quoteListView',
                
                
                controlsView: Ember.View.extend({
                	templateName: 'controls',
                	/*contentBinding: 'QuotePhoto.RandomQuoteController.content',*/
                	classNames: ['controls']
                }),
             

                selectedPhotoView: Ember.View.extend({
                    templateName: 'selected-photo',
                    contentBinding: 'QuotePhoto.SelectedPhotoController.content',
                    classNames: ['selectedPhoto']
                }),
                
                photoListView: Ember.View.extend({
                    templateName: 'photo-view-list',
                    contentBinding: 'QuotePhoto.PhotoListController.content',
                    classNames: ['thumbnailViewList']
                }),
                
               /* quoteListView: Ember.View.extend({
                	templateName: 'quotes-list',
                	contentBinding: 'QuotePhoto.QuoteListController.content',
                	classNames: ['quotesList']
                }), */
                
                quoteView: Ember.View.extend({
                	templateName: 'quote',
                	contentBinding: 'QuotePhoto.QuoteController.content',
                	classNames: ['quote']
                })
                
                
                
            })
        })
    });

}, 50);

function loadPhotos() {

  var imgurUrl = "https://api.imgur.com/3/gallery/random/random";
  var authorization = 'Client-ID ' + 'ded4f2ce832b708';

  $.ajax({
    url: imgurUrl,
    method: 'GET',
    headers: {
      Authorization: authorization,
      Accept: 'application/json'
    },
    success: function(result) {
      console.log(result);

      if(result.data.length == 0)
        return false;

      var offset = Math.floor(Math.random() * 50) + 7;
      var content = result.data.slice(offset - 7, offset);

      QuotePhoto.PhotoListController.set('content', content);
      //QuotePhoto.PhotoListController.set('selected', QuotePhoto.PhotoListController.get('content')[selected]);
    }
  });

};


function loadQuotes() {
	$.ajax({
		url: "quotes.json",
		processData: true,
		data: {},
		dataType: "json",
		success: function(quotes) {
				QuotePhoto.QuoteListController.set('content', quotes);
				var cLength = QuotePhoto.QuoteListController.get('content').length;
				QuotePhoto.QuoteListController.set('selected', QuotePhoto.QuoteListController.get('content')[Math.floor(Math.random() * cLength)])
			},
		error: function(x,y,z) {
				// y.responseText should have what's wrong
				console.log(y.responseText);
			}
	});
};

