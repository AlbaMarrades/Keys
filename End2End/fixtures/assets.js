export default class Fixture{

    static  clean(){
        fetch('http://localhost:3001/test/flush')
    }

}