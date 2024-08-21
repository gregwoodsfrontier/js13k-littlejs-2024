class TilesCountDownComponent {

    currentCount = 0
    countLimit = 13
    distancePerCounter = 1
    currentPosX = 0
    walkedDistance = 0

    /**
     * Game Component for counting tiles
     * @constructor
     * @param {number} countLimit - The number limit that you want certain mechanics to trigger
     * @param {number} distancePerCounter - The number of distance units the player has to walk to count as 1 counter 
     */
    constructor(countLimit, distancePerCounter) {
        this.countLimit = countLimit;
        this.distancePerCounter = distancePerCounter;
        this.currentCount = 0;
        this.currentPosX = 0;
        this.walkedDistance = 0;
    }
    
    updateCurrPosX(_posx) {
        this.currentPosX = _posx
    }

    update(_posx, _vecx) {
        if(this.currentPosX === _posx) return

        this.walkedDistance += Math.abs(_vecx)
        console.log(this.walkedDistance.toFixed(4))

        if(this.walkedDistance > this.distancePerCounter) {
            this.currentCount++
            this.walkedDistance = 0

            if(this.currentCount >= this.countLimit) {
                this.executeMechanic()
                this.currentCount = 0
            }
        }
        this.updateCurrPosX(_posx)
    }

    executeMechanic() {

    }
}