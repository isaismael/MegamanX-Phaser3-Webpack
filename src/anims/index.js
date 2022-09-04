

export default anims => {
    anims.create({
        key: 'hit-enemy',
        frames: anims.generateFrameNumbers('hit-enemy', { start: 0, end: 2}),
        frameRate: 5,
        repeat: 0
    })
}