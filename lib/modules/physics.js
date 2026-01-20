/**
 * Provides functions for collision detection.
 */
export class Physics {

    /**
     * Checks if two axis-aligned rectangles overlap.
     * @param {number} x1 X-coordinate of the first rectangle.
     * @param {number} y1 Y-coordinate of the first rectangle.
     * @param {number} w1 Width of the first rectangle.
     * @param {number} h1 Height of the first rectangle.
     * @param {number} x2 X-coordinate of the second rectangle.
     * @param {number} y2 Y-coordinate of the second rectangle.
     * @param {number} w2 Width of the second rectangle.
     * @param {number} h2 Height of the second rectangle.
     * @returns {boolean} True if the rectangles overlap, false otherwise.
     */
    rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
        // AABB collision detection
        return x1 < x2 + w2 &&
               x1 + w1 > x2 &&
               y1 < y2 + h2 &&
               y1 + h1 > y2;
    }

	/**
	 * @private
	 * Calculates the axis-aligned bounding box (AABB) for a transformed image.
	 * @param {Jmage} img The image object.
	 * @param {number} x The world x-coordinate of the image's handle.
	 * @param {number} y The world y-coordinate of the image's handle.
	 * @returns {{x: number, y: number, width: number, height: number}} The AABB.
	 */
	#getTransformedBoundingBox(img, x, y) {
		const w = img.width;
		const h = img.height;
		const hx = img.handle.x;
		const hy = img.handle.y;
		const sx = img.scaleFactor.x;
		const sy = img.scaleFactor.y;
		const rad = img.rotation * Math.PI / 180;
		const cos = Math.cos(rad);
		const sin = Math.sin(rad);

		const corners = [
			{ x: -hx, y: -hy },
			{ x: w - hx, y: -hy },
			{ x: w - hx, y: h - hy },
			{ x: -hx, y: h - hy }
		];

		let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

		corners.forEach(corner => {
			const scaledX = corner.x * sx;
			const scaledY = corner.y * sy;

			const rotatedX = scaledX * cos - scaledY * sin;
			const rotatedY = scaledX * sin + scaledY * cos;

			const finalX = rotatedX + x;
			const finalY = rotatedY + y;

			minX = Math.min(minX, finalX);
			maxX = Math.max(maxX, finalX);
			minY = Math.min(minY, finalY);
			maxY = Math.max(maxY, finalY);
		});

		return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
	}

    /**
     * Checks if two images, placed at specific coordinates, overlap based on their bounding boxes.
     * This check correctly handles scaled and rotated images by calculating their axis-aligned bounding box.
     * @param {Jmage} img1 The first image object.
     * @param {number} x1 The x-coordinate of the first image's handle.
     * @param {number} y1 The y-coordinate of the first image's handle.
     * @param {Jmage} img2 The second image object.
     * @param {number} x2 The x-coordinate of the second image's handle.
     * @param {number} y2 The y-coordinate of the second image's handle.
     * @returns {boolean} True if the images' bounding boxes overlap, false otherwise.
     */
    imagesOverlap(img1, x1, y1, img2, x2, y2) {
        if (!img1 || !img2 || !img1.width || !img2.width) {
            return false; // One of the images is not loaded or invalid
        }

		const box1 = this.#getTransformedBoundingBox(img1, x1, y1);
		const box2 = this.#getTransformedBoundingBox(img2, x2, y2);

		return this.rectsOverlap(box1.x, box1.y, box1.width, box1.height, box2.x, box2.y, box2.width, box2.height);
    }

    /**
     * Checks for pixel-perfect collision between two images, correctly handling translation, scaling, and rotation.
     * @param {Jmage} img1 The first image object.
     * @param {number} x1 The x-coordinate of the first image's handle.
     * @param {number} y1 The y-coordinate of the first image's handle.
     * @param {number} [frame1=1] The frame number for the first image.
     * @param {Jmage} img2 The second image object.
     * @param {number} x2 The x-coordinate of the second image's handle.
     * @param {number} y2 The y-coordinate of the second image's handle.
     * @param {number} [frame2=1] The frame number for the second image.
     * @param {number} [alphaThreshold=128] The alpha value (0-255) above which a pixel is considered solid.
     * @returns {boolean} True if any solid pixels overlap, false otherwise.
     */
    imagesCollide(img1, x1, y1, frame1 = 1, img2, x2, y2, frame2 = 1, alphaThreshold = 128) {
        const box1 = this.#getTransformedBoundingBox(img1, x1, y1);
        const box2 = this.#getTransformedBoundingBox(img2, x2, y2);
        if (!this.rectsOverlap(box1.x, box1.y, box1.width, box1.height, box2.x, box2.y, box2.width, box2.height)) {
            return false;
        }

        const data1 = img1.getImageData();
        const data2 = img2.getImageData();
        if (!data1 || !data2) return false; // Images not ready

        const intersectX1 = Math.max(box1.x, box2.x);
        const intersectY1 = Math.max(box1.y, box2.y);
        const intersectX2 = Math.min(box1.x + box1.width, box2.x + box2.width);
        const intersectY2 = Math.min(box1.y + box1.height, box2.y + box2.height);

        const rad1 = -img1.rotation * Math.PI / 180;
        const cos1 = Math.cos(rad1);
        const sin1 = Math.sin(rad1);
        const invScaleX1 = 1 / img1.scaleFactor.x;
        const invScaleY1 = 1 / img1.scaleFactor.y;

        const rad2 = -img2.rotation * Math.PI / 180;
        const cos2 = Math.cos(rad2);
        const sin2 = Math.sin(rad2);
        const invScaleX2 = 1 / img2.scaleFactor.x;
        const invScaleY2 = 1 / img2.scaleFactor.y;

        const frame1Pos = img1.getFramePos(frame1 - 1);
        const frame2Pos = img2.getFramePos(frame2 - 1);

        for (let y = intersectY1; y < intersectY2; y++) {
            for (let x = intersectX1; x < intersectX2; x++) {
                const dx1 = x - x1, dy1 = y - y1;
                const rotatedX1 = dx1 * cos1 - dy1 * sin1;
                const rotatedY1 = dx1 * sin1 + dy1 * cos1;
                const localX1 = (rotatedX1 * invScaleX1) + img1.handle.x;
                const localY1 = (rotatedY1 * invScaleY1) + img1.handle.y;

                const dx2 = x - x2, dy2 = y - y2;
                const rotatedX2 = dx2 * cos2 - dy2 * sin2;
                const rotatedY2 = dx2 * sin2 + dy2 * cos2;
                const localX2 = (rotatedX2 * invScaleX2) + img2.handle.x;
                const localY2 = (rotatedY2 * invScaleY2) + img2.handle.y;

                if (localX1 >= 0 && localX1 < img1.width && localY1 >= 0 && localY1 < img1.height &&
                    localX2 >= 0 && localX2 < img2.width && localY2 >= 0 && localY2 < img2.height) {

                    const sourceX1 = frame1Pos.x + Math.floor(localX1);
                    const sourceY1 = frame1Pos.y + Math.floor(localY1);
                    const sourceX2 = frame2Pos.x + Math.floor(localX2);
                    const sourceY2 = frame2Pos.y + Math.floor(localY2);

                    const alpha1 = data1.data[(sourceY1 * data1.width + sourceX1) * 4 + 3];
                    const alpha2 = data2.data[(sourceY2 * data2.width + sourceX2) * 4 + 3];

                    if (alpha1 > alphaThreshold && alpha2 > alphaThreshold) {
                        return true; // Collision detected
                    }
                }
            }
        }

        return false;
    }
}