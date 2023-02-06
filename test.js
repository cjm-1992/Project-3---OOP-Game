  //movement 
  let moving = true
  if (keys.w.pressed && lastKey === 'w') {
      for (let i = 0; i < mapCols0.length; i++) {
          const mapCol0 = mapCols0[i]
          if (
              collide({
                  charCol: mainChar,
                  worldCol: {
                      ...mapCol0,
                      position: {
                          x: mapCol0.position.x,
                          y: mapCol0.position.y + 3
                      }
                  }
              })
          ) {
              moving = false
              break
          }
      }
  
      if (moving)
          movements.forEach ((movement) => {
              movement.position.y += 3
          })
     
  }   else if (keys.a.pressed && lastKey === 'a') {
      for (let i = 0; i < mapCols0.length; i++) {
          const mapCol0 = mapCols0[i]
          if (
              collide({
                  charCol: mainChar,
                  worldCol: {
                      ...mapCol0,
                      position: {
                          x: mapCol0.position.x + 3,
                          y: mapCol0.position.y
                      }
                  }
              })
          ) {
              moving = false
              break
          }
      }
  
      if (moving)
          movements.forEach ((movement) => {
              movement.position.x += 3
          })

  }  else if (keys.s.pressed && lastKey === 's') {
      for (let i = 0; i < mapCols0.length; i++) {
          const mapCol0 = mapCols0[i]
          if (
              collide({
                  charCol: mainChar,
                  worldCol: {
                      ...mapCol0,
                      position: {
                          x: mapCol0.position.x,
                          y: mapCol0.position.y - 3
                      }
                  }
              })
          )   {
              moving = false
              break
          }
      }
  
      if (moving)
          movements.forEach((movement) => { 
              movement.position.y -= 3
          })
          
  }   else if (keys.d.pressed && lastKey === 'd') {
      for (let i = 0; i < mapCols0.length; i++) {
          const mapCol0 = mapCols0[i]
          if (
              collide({
                  charCol: mainChar,
                  worldCol: {
                      ...mapCol0,
                      position: {
                          x: mapCol0.position.x - 3,
                          y: mapCol0.position.y 
                      }
                  }
              })
          ) {
              moving = false
              break
          }
      }
  
      if (moving)
      movements.forEach ((movement) => {
          movement.position.x -= 3
      })
}
animate()