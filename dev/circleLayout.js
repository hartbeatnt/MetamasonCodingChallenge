// modified from Kevin Ngo's A-Frame Layout component:
// github.com/ngokevin/kframe/tree/master/components/layout/

const circleLayout = (radius, quantity, center) => {
  let positions = [];
  for (let i = 0; i < quantity; i++) {
    let radians = i * (2 * Math.PI) / quantity;
    positions.push({
      x: center.x + radius * Math.cos(radians),
      y: center.y,
      z: center.z + radius * Math.sin(radians)
    });
  }
  return positions;
}

export { circleLayout };