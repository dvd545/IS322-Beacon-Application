var adds = [
    {id:0 , title:"Boys Sweatshirt", oPrice:"$25.99" , dPrice:"$22.99" , description:"This is a warm sweatshirt. Great for wearing" , location:"Boys Clothing", image:"img/pic5.jpg"},
    {id:1 , title:"Girls T-shirt", oPrice:"$20.99" , dPrice:"$19.99" , description:"Summertime Graphic T-shirt for Girls" , location:"Girls Clothing", image:"img/pic1.jpg"},
    {id:2 , title:"Ladies Watch", oPrice:"$140.99" , dPrice:"$120.99" , description:"This is a warm sweatshirt. Great for wearing" , location:"Ladies Accesories", image:"img/pic2.jpg"},
    {id:3 , title:"Boys Shoes", oPrice:"$55.99" , dPrice:"$43.99" , description:"This is a warm sweatshirt. Great for wearing" , location:"Footwear", image:"img/pic3.jpg"},
    {id:4 , title:"Girls Backpack Sweatshirt", oPrice:"$35.99" , dPrice:"$25.99" , description:"This is a warm sweatshirt. Great for wearing" , location:"Girls Clothing", image:"img/pic3.jpg"},
    {id:5 , title:"Greeting Card", oPrice:"$5.99" , dPrice:"$2.99" , description:"This is a warm sweatshirt. Great for wearing" , location:"Paper Items", image:"img/pic4.jpg"}
];

exports.findAll = function (req, res, next) {
    res.send(adds);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(adds[id]);
};