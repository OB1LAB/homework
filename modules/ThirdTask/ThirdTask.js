"use client"
import Decimal from "decimal.js";
import {useEffect, useRef} from "react";
import styles from "./ThirdTask.module.scss"

const vertexes = [
  [new Decimal(500), new Decimal(400)],
  [new Decimal(500), new Decimal(350)],
  // [new Decimal(400), new Decimal(400)],
  [new Decimal(400), new Decimal(350)],
]

const drawLine = (ctx, x0, y0, x1, y1) => {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

const cosDegree = (degree) => {
  const angleInDegrees = new Decimal(degree);
  const angleInRadians = angleInDegrees.mul(Decimal.acos(-1)).div(180);
  return Decimal.cos(angleInRadians)
}

const sinDegree = (degree) => {
  const angleInDegrees = new Decimal(degree);
  const radians = Decimal.div(angleInDegrees, 180).times(Math.PI);
  return Decimal.sin(radians);
}

const rotateVertex = (vertex, degree) => {
  return [vertex[0].mul(cosDegree(degree)).minus(vertex[1].mul(sinDegree(degree))), vertex[0].mul(sinDegree(degree)).plus(vertex[1].mul(cosDegree(degree)))]
}

const diffBetweenVertex = (vertex0, vertex1) => {
  return [vertex0[0].minus(vertex1[0]), vertex0[0].minus(vertex1[1])]
}

const getSortedVertexes = (vertexes) => {
  for (let index0 = 0; index0 < 3; index0++) {
    for (let index1 = 0; index1 < 3; index1++) {
      for (let index2 = 0; index2 < 3; index2++) {
        if (!(index0 === index1 || index1 === index2 || index2 === index0))
          if (calculateAngle(vertexes[index0], vertexes[index1], vertexes[index2]) === 90) {
            return [vertexes[index0], vertexes[index1], vertexes[index2]]
          }
      }
    }
  }
  return [];
}

function calculateAngle(vertex0, vertex1, vertex2) {
  const BAx = vertex0[0].minus(vertex1[0]);
  const BAy = vertex0[1].minus(vertex1[1]);
  const BCx = vertex2[0].minus(vertex1[0]);
  const BCy = vertex2[1].minus(vertex1[1]);
  const dotProduct = BAx.mul(BCx).plus(BAy.mul(BCy));
  const magnitudeBA = BAx.pow(2).plus(BAy.pow(2)).sqrt();
  const magnitudeBC = BCx.pow(2).plus(BCy.pow(2)).sqrt();
  const cosTheta = dotProduct.div(magnitudeBA.mul(magnitudeBC));
  const thetaRad = Decimal.acos(cosTheta);
  const thetaDeg = thetaRad.mul(new Decimal(180)).div(Decimal.acos(-1)); // 180 / π
  return thetaDeg.toNumber();
}


vertexes.forEach((vertex, vertexIndex) => {
  vertexes[vertexIndex] = rotateVertex(vertex, 10)
})

const ThirdTask = () => {
  const canvasRef = useRef()
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineWidth = 2;
      const sortedVertexes = getSortedVertexes(vertexes)
      const allX = [sortedVertexes[0][0], sortedVertexes[1][0], sortedVertexes[2][0]]
      const allY = [sortedVertexes[0][1], sortedVertexes[1][1], sortedVertexes[2][1]]
      const vertex3X = allX.find((item) => allX.filter((a) => a.eq(item)).length === 1)
      const vertex3Y = allY.find((item) => allY.filter((a) => a.eq(item)).length === 1)
      sortedVertexes[3] = [vertex3X, vertex3Y]
      for (let degree = 0; degree < 360; degree++) {
        const rotatedVertex0 = rotateVertex(sortedVertexes[0], -degree);
        const rotatedVertex1 = rotateVertex(sortedVertexes[1], -degree);
        if (rotatedVertex0[0].eq(rotatedVertex1[0]) || rotatedVertex0[1].eq(rotatedVertex1[1])) {
          console.log('find')
          sortedVertexes.forEach((vertex, vertexIndex) => {
            sortedVertexes[vertexIndex] = rotateVertex(vertex, -degree)
          })
          break;
        }
      }
      console.log(sortedVertexes[0][0].toNumber(), sortedVertexes[0][1].toNumber())
      console.log(sortedVertexes[1][0].toNumber(), sortedVertexes[1][1].toNumber())
      console.log(sortedVertexes[2][0].toNumber(), sortedVertexes[2][1].toNumber())
      console.log(sortedVertexes[3][0].toNumber(), sortedVertexes[3][1].toNumber())
      drawLine(ctx, sortedVertexes[0][0].toNumber(), sortedVertexes[0][1].toNumber(), sortedVertexes[1][0].toNumber(), sortedVertexes[1][1].toNumber())
      drawLine(ctx, sortedVertexes[1][0].toNumber(), sortedVertexes[1][1].toNumber(), sortedVertexes[2][0].toNumber(), sortedVertexes[2][1].toNumber())
      drawLine(ctx, sortedVertexes[2][0].toNumber(), sortedVertexes[2][1].toNumber(), sortedVertexes[3][0].toNumber(), sortedVertexes[3][1].toNumber())
      drawLine(ctx, sortedVertexes[3][0].toNumber(), sortedVertexes[3][1].toNumber(), sortedVertexes[0][0].toNumber(), sortedVertexes[0][1].toNumber())
    }
  }, []);
  return <div>
    <canvas width={800} height={600} className={styles.canvas} ref={canvasRef}/>
  </div>
}

export default ThirdTask
