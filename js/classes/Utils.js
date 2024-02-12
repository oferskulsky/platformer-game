function isOverlapping(element1, element2) {
  const isLeftOfelement1 =
    element2.position.x + element2.width < element1.position.x + element1.velocity.x;
  const isRightOfelement1 =
    element2.position.x > element1.position.x + element1.width + element1.velocity.x;
  const isAboveelement1 =
    element2.position.y + element2.height < element1.position.y + element1.velocity.y;
  const isUnderelement1 =
    element2.position.y > element1.position.y + element1.height + element1.velocity.y;
  return (
    !isAboveelement1 &&
    !isUnderelement1 &&
    !isLeftOfelement1 &&
    !isRightOfelement1
  );
}

function isMovingOver(element1, element2) {
  const overlap = { horizontal: false, vertical: false };
  var before = false;
  var after = false;
  if (!element1.velocity) {
    return overlap;
  }
  if (element1.velocity.x < 0) {
      before = element2.position.x + element2.width > element1.position.x + 0.01;
    after =
      element2.position.x + element2.width >
      element1.position.x + element1.velocity.x;
  } else if (element1.velocity.x > 0) {
    before = element2.position.x < element1.position.x + element1.width + 0.01;
    after =
      element2.position.x <
      element1.position.x + element1.width + element1.velocity.x + 0.01;
  }
  overlap.horizontal = !before && after;

  before = false;
  after = false;
  if (element1.velocity.y < 0) {
    before = element2.position.y + element2.height > element1.position.y + 0.01;
    after =
      element2.position.y + element2.height >
      element1.position.y + element1.velocity.y + 0.01;
  } else if (element1.velocity.y > 0) {
    before = element2.position.y < element1.position.y + element1.height;
    after =
      element2.position.y <
      element1.position.y + element1.height + element1.velocity.y;
  }
  overlap.vertical = !before && after;
  return overlap;
}
