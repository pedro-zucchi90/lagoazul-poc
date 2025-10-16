export function CameraControls({
    cameraControl,
    setCameraState,
  }: {
    cameraControl: React.RefObject<any>
    setCameraState: Function
    cameraState: any
  }) {

    const handleZoom = (delta: number) => {
      setCameraState((prev: any) => {
        let fov = Math.max(30, Math.min(90, prev.fov + delta))
        cameraControl.current?.object && (cameraControl.current.object.fov = fov)
        cameraControl.current?.object && cameraControl.current.object.updateProjectionMatrix()
        return { ...prev, fov }
      })
    }
    const handleRotate = (azimuthDelta: number, polarDelta: number) => {
      if (
        cameraControl.current &&
        typeof cameraControl.current.getAzimuthalAngle === "function" &&
        typeof cameraControl.current.getPolarAngle === "function" &&
        typeof cameraControl.current.setAzimuthalAngle === "function" &&
        typeof cameraControl.current.setPolarAngle === "function"
      ) {
        const currentAzimuth = cameraControl.current.getAzimuthalAngle()
        const currentPolar = cameraControl.current.getPolarAngle()
        cameraControl.current.setAzimuthalAngle(currentAzimuth + azimuthDelta)
        cameraControl.current.setPolarAngle(currentPolar + polarDelta)
        cameraControl.current.update()
      }
    }
    const handleReset = () => {
      cameraControl.current?.reset()
    }
    return (
      <div className="flex flex-col gap-3 p-0 m-0">
        <div className="flex gap-3 mb-2">
          <button
            className="px-4 py-2 rounded-full font-semibold shadow text-sm transition
              bg-blue-600 text-white hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Zoom in"
            onClick={() => handleZoom(-5)}
            style={{
              border: "none",
              minWidth: "2.5rem",
              minHeight: "2.5rem",
            }}
          >
            🔍+
          </button>
          <button
            className="px-4 py-2 rounded-full font-semibold shadow text-sm transition
              bg-blue-600 text-white hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Zoom out"
            onClick={() => handleZoom(5)}
            style={{
              border: "none",
              minWidth: "2.5rem",
              minHeight: "2.5rem",
            }}
          >
            🔍-
          </button>
          <button
            className="px-4 py-2 rounded-full font-semibold shadow text-sm transition
              bg-gray-700 text-white hover:bg-blue-600
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Reset"
            onClick={handleReset}
            style={{
              border: "none",
              minWidth: "2.5rem",
              minHeight: "2.5rem",
              letterSpacing: "0.01em"
            }}
          >
            ⟳ Reset
          </button>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-full font-semibold shadow text-sm transition
              bg-gray-700 text-white hover:bg-blue-600
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Rotacionar Esquerda"
            onClick={() => handleRotate(0.2, 0)}
            style={{ border: "none", minWidth: "2.5rem", minHeight: "2.5rem" }}
          >
            ↺
          </button>
          <button
            className="px-4 py-2 rounded-full font-semibold shadow text-sm transition
              bg-gray-700 text-white hover:bg-blue-600
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Rotacionar Direita"
            onClick={() => handleRotate(-0.2, 0)}
            style={{ border: "none", minWidth: "2.5rem", minHeight: "2.5rem" }}
          >
            ↻
          </button>
          <button
            className="px-4 py-2 rounded-full font-semibold shadow text-sm transition
              bg-gray-700 text-white hover:bg-blue-600
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Subir"
            onClick={() => handleRotate(0, -0.2)}
            style={{ border: "none", minWidth: "2.5rem", minHeight: "2.5rem" }}
          >
            ↑
          </button>
          <button
            className="px-4 py-2 rounded-full font-semibold shadow text-sm transition
              bg-gray-700 text-white hover:bg-blue-600
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Descer"
            onClick={() => handleRotate(0, 0.2)}
            style={{ border: "none", minWidth: "2.5rem", minHeight: "2.5rem" }}
          >
            ↓
          </button>
        </div>
      </div>
    )
  }
  