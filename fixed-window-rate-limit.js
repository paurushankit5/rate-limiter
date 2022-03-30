class RateLimit{
    constructor(max_request, time_unit){
        this.max_request = max_request;
        this.time_unit = time_unit;
        this.data = {}

    }


    ratelimit(user){
        let curTime = Math.floor(Date.now())

        // if(!this.data[user]){
        //     this.incrementCounter(user);
        // }else{
        //     if(curTime - this.data[user].time <= this.time_unit   ){
        //         if(this.data[user].counter == this.max_request){
        //             return false
        //         }
        //         else{
        //             this.incrementCounter(user, curTime)
        //             return true
        //         }
        //     }
        //     this.incrementCounter(user,curTime)
        // }

        let count = this.incrementCounter(user, curTime)

        if(count <= this.max_request)
            return true
        return false
    }


    incrementCounter(user, curTime){

        if(this.data[user]){
            if(curTime - this.data[user].time <= this.time_unit  ){
                if(this.data[user].counter < this.max_request);
                    this.data[user].counter = this.data[user].counter+1
            }else{
                this.refreshCounter(user)
                this.data[user] =  this.resetUserValue(curTime)

            }
        }else{
            this.data[user] =  this.resetUserValue(curTime)
        }

        return this.data[user].counter
        
    }

    resetUserValue(curTime){
        return  {
                "time" : curTime,
                "counter"  : 1
            }
        
    }


    refreshCounter(user){
        if(this.data[user]){
            delete(this.data[user])
        }
    }


}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

let limiter = new RateLimit(2, 1000)
console.log(limiter.ratelimit("u1"))
console.log(limiter.ratelimit("u1"))
console.log(limiter.ratelimit("u1"))
sleep(1000)
console.log(limiter.ratelimit("u1"))
console.log(limiter.ratelimit("u2"))
console.log(limiter)


