(function () {
    'use strict';

    angular
        .module('app')
        .controller('NoteController', NoteController);

    NoteController.$inject = ['$rootScope', 'NoteService', '$scope', '$filter'];

    function NoteController($rootScope, NoteService, $scope, $filter) {
        var vm = this;
        
        vm.selectedNote = { };

        vm.newNote = { titleName: "", detailText: "", createdAt: Date.now() };

        vm.currentPage = 0;
        vm.pageSize = 10;
        vm.data = [];
        vm.q = '';

        vm.notebyFieldQ = "";

        // vm.notebyField = function (name) {
        //      if (vm.notebyFieldQ === "")
        //      vm.notebyFieldQ = "-";
        //      else 
        //      vm.notebyFieldQ = "";

        //      vm.noteQ  =  vm.notebyFieldQ + name;
        // };
        
       
        
        // for (var i=0; i<65; i++) {
        //     vm.notes.push("Item "+i);
        // }
    
        // $scope.$watch('q', function(newValue,oldValue){
        //     if(oldValue!=newValue){
        //     vm.currentPage = 0;
        //   }
        // },true);


        vm.categories = [];
        
        initController();

        vm.removeNote = removeNote;
        vm.addNote = addNote;
        vm.setFavoriteNote= setFavoriteNote;
        vm.setCategoryNote = setCategoryNote;
        vm.viewNote = viewNote;

        vm.tmpViewNote = { titleName: "", detailText: ""};

        function initController() {
            loadNotes();
            loadCategories();
        } 

        function loadNotes() {
            NoteService.GetAll(function (response) {
                vm.notes = response.notes;

                 vm.getData = function () {
                    return $filter('filter')(vm.notes, vm.q)
                }
        
                vm.numberOfPages=function(){
                    return Math.ceil(vm.getData().length/vm.pageSize);
                }
            });

            // vm.notes = [{
            //     "titleName": "Test",
            //     "detailText" : "Notun text alani test",
            //     "createdAt" : Date.now(),
            //     "category": 3
            // }];
        }
        
        function viewNote(note) {
             vm.tmpViewNote.titleName = note.titleName;
             vm.tmpViewNote.detailText = note.detailText;
        }

        function loadCategories() {
            vm.categories = GetTypeRoles();
        }

        function addNote(title, desc, categoryId) {
            var newNote = {
            CreatedAt: Date.now(),
            titleName : title,
            detailText : desc,
            category: categoryId
            };

            NoteService.CreateNote(newNote, function (response){
               if (response.status) {
                    vm.notes.push(newNote);

                    $scope.$apply();
                }
            });
        }

        function removeNote(note) {

            const swalWithBootstrapButtons = Swal.mixin({
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
            });
            
            swalWithBootstrapButtons.fire({
                title:  notifyCodeMsg.find(x=> x.code == "0x11107").detail[$rootScope.langKey],
                text: notifyCodeMsg.find(x=> x.code == "0x11114").detail[$rootScope.langKey],
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: notifyCodeMsg.find(x=> x.code == "0x11109").detail[$rootScope.langKey],
                cancelButtonText: notifyCodeMsg.find(x=> x.code == "0x11110").detail[$rootScope.langKey],
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    NoteService.DeleteNote(note, function (response) {
                        debugger;
                        if (response.status){
                            var index = vm.notes.indexOf(note);
                            vm.notes.splice(index, 1);  
                            $scope.$apply();
                        }
                    });
                }
            }); 
        }

        function setCategoryNote(note, categoryId) {
            
            var tmpNote = {
                noteId: note.noteId,
                category: categoryId,
                titleName :"",
                detailText: ""
            };

            NoteService.SetNoteCategory(tmpNote, function (response){
                if (response.status) {
                    note.category = categoryId;   

                    $scope.$apply();
                }
            });
        }

        function setFavoriteNote(note) {

            var tmpNote = {
                noteId: note.noteId,
                titleName :"",
                detailText: ""
            };

            if (note.category == 4) {
                tmpNote.category = 3;
            } else {
                tmpNote.category = 4;
            }

            NoteService.SetNoteCategory(tmpNote, function (response){
                if (response.status) {
                    note.category = tmpNote.category;   

                    $scope.$apply();
                }
            });
            
        }

        return vm;
    };

})();