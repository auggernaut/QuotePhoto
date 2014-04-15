/*Adapter
 * NOT USED
 */
QuotePhoto.Adapter = DS.Adapter.create({
    findAll: function(store, type) {
        var path = type.path;

        $.getJSON(path, function(data) {
            // data is a Hash of key/value pairs. If your server returns a
            // root, simply do something like:
            //   store.load(type, id, data.person)
            store.loadMany(type, data);
        });
    }
});

QuotePhoto.store = DS.Store.create({
    adapter: QuotePhoto.Adapter
});

