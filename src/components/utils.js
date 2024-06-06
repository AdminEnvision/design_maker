const Utils = (context, text, x, y, radius, startRotation = 0) => {
  const numRadsPerLetter = (2 * Math.PI) / text.length;
  context.save();
  context.translate(x, y);
  context.rotate(startRotation);

  for (let i = 0; i < text.length; i++) {
    context.save();
    context.rotate(i * numRadsPerLetter);

    context.textAlign = "right";
    context.fillText(text[i], -radius, 0);

    context.restore();
  }

  context.restore();
};
export default Utils;
