class Beer
   {
     constructor(name)
    {this.name = name}
     //methods
    getrank() {return this.rank};
    getname() { return this.name };
    getdescription() {return this.description};
    updaterank (rank) { this.rank =rank };
    saveBeer() { return Beer.getname }};
    module.exports = Beer;