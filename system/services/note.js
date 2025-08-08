(function () {
    'use strict';

    angular
        .module('app')
        .factory('NoteService', NoteService);

    NoteService.$inject = ['getjson'];
    function NoteService(getjson) {
        var service = {};

        service.GetAll = GetAll;
        service.CreateNote = CreateNote;
        service.DeleteNote = DeleteNote;
        service.SetNoteCategory = SetNoteCategory;

        var NoteServiceUrl = zoeURL + "internal/";

        NoteServiceUrl = NoteServiceUrl.replace("8080", "8088");

        return service;

        function GetAll(callback) {
            getjson.getData(NoteServiceUrl + "note", true).then(function (res) {
                    callback(res);  
            });            
        }

        function CreateNote(note, callback) {
          getjson.postData(NoteServiceUrl + "note", note, false, false).then(function (res) {
                        callback(res);
                    });   
        }   

        function DeleteNote(note, callback) {
            getjson.deleteDataBody(NoteServiceUrl + "note", note, false, false).then(function (res) {
                    callback(res);  
            });            
        }

        function SetNoteCategory(note, callback) {
            getjson.putData(NoteServiceUrl + "note", note, false, false).then(function (res) {
                    callback(res);  
            });            
        }
    }

})();
