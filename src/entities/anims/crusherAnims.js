

export default (anims) => {
    // IDLE
    anims.create({
        key:'crusher-idle',
        frames: anims.generateFrameNumbers(
            'crusher',
            {
                start: 0,
                end: 2
            }
        ),
        frameRate: 6,
        repeat: -1
    })
}