var categoryListings = [
   {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
   {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
   {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
]


var pageContent = document.querySelector('.content-area')
// console.log(pageContent)


var bookModel = Backbone.Model.extend({
   url: '',

   initialize: function(bookVal){
      this.url = bookVal
   }
})


var bookCollection = Backbone.Collection.extend({
   model: bookModel,
   url: '',


   initialize: function(catVal){
      this.url = 'https://www.googleapis.com/books/v1/volumes?q=subject' + catVal
   }
})

var appRouter = Backbone.Router.extend({

   routes: {
      "showBookCat/:bookCat" : 'showCatPage',
      "showThisBook/:bookId" : 'showMorePage',
      "" : 'showHomePage'

   },

   showHomePage: function(){

      pageContent.innerHTML = ''

      categoryListings.forEach(function(data){
         var listHolder = document.createElement('div')
         listHolder.classList = 'col-sm-4'
         pageContent.appendChild(listHolder)
            var lhUnList = document.createElement('ul')
            listHolder.appendChild(lhUnList)
               var listHeaderLink = document.createElement('a')
               listHeaderLink.href = '#showBookCat/:' + data.catName
               lhUnList.appendChild(listHeaderLink)
                  var listHeaderText = document.createElement('h1')
                  listHeaderText.textContent = data.catName
                  listHeaderLink.appendChild(listHeaderText)

                  data.subcatList.forEach(function(cat){
                     var listSubLink = document.createElement('a')
                     listSubLink.href = '#showBookCat/:' + cat
                     lhUnList.appendChild(listSubLink)
                        var listSubText = document.createElement('li')
                        listSubText.textContent = cat
                        listSubLink.appendChild(listSubText)
                  })
      })

   },

   showCatPage: function(bookCat){

      pageContent.innerHTML = ''

      var bookCatCollection = new bookCollection(bookCat)
      bookCatCollection.fetch().then(function(data){
         data.items.forEach(function(moreData){

            console.log(data.items)

            var bookHolder = document.createElement('div')
            bookHolder.classList = 'col-sm-3'
            pageContent.appendChild(bookHolder)
               var bookImg = document.createElement('img')
               bookImg.src = moreData.volumeInfo.imageLinks.smallThumbnail
               bookImg.width = '90px'
               bookHolder.appendChild(bookImg)
               var bookTitle = document.createElement('h1')
               bookTitle.textContent = moreData.volumeInfo.title
               bookHolder.appendChild(bookTitle)

            // console.log(moreData.volumeInfo)
         })
         console.log('im here')
      })

   },

   showMorePage: function(bookId){

      // var bookMoreInfo = new bookModel(data.items.selflink)
      // bookMoreInfo.fetch



   },

   initialize: function(){

      Backbone.history.start()
   }


})


var app = new appRouter
