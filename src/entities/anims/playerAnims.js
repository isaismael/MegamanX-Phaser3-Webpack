


export default (anims) => {
    // IDLE
    anims.create({
        key:'idle',
        frames: anims.generateFrameNumbers(
            'player',
            {
                start: 0,
                end: 2
            }
        ),
        frameRate: 4,
        repeat: -1
    })
    // JUMP
    anims.create({
        key:'jump',
        frames: anims.generateFrameNumbers(
            'player',
            {
                start: 3,
                end: 9
            }
        ),
        frameRate: 4,
        repeat: -1
    })
    // RUN
    anims.create({
        key:'run',
        frames: anims.generateFrameNumbers(
            'player',
            {
                start: 11,
                end: 20
            }
        ),
        frameRate: 10,
        repeat: -1
    })
    
}