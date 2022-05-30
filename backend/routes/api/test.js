const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/Country');

// Describe our tests
describe('Nesting records', function(){

    // Create tests
    it('Creates an author with sub-documents', function(done){

        var pat = new Author({
            name: 'Burkina Faso',
            state: [{name: 'Bale'}]
        });

        pat.save().then(function(){
            Author.findOne({name: 'Burkina Faso'}).then(function(record){
                assert(record.state.length === 1);
                done();
            });
        });

    });


});