export function CameraControls({ cameraControl, setCameraState }: any) {

  
  const zoom = (d: number) => { // Função para aplicar zoom na câmera, ajustando o campo de visão (fov)
    
    setCameraState((prev: any) => { // Atualiza o estado da câmera usando a função setCameraState
      const fov = Math.max(30, Math.min(90, prev.fov + d)); // Calcula o novo fov, limitando entre 30 (mais próximo) e 90 (mais afastado)
      if (cameraControl.current?.object) { // Se o objeto da câmera estiver disponível no cameraControl
        cameraControl.current.object.fov = fov; // Atualiza o valor do campo de visão (fov) diretamente no objeto da câmera
        cameraControl.current.object.updateProjectionMatrix(); // Atualiza a matriz de projeção após alteração do fov
      }
      return { ...prev, fov };// Retorna o novo estado da câmera, preservando outras propriedades
    });
  };

  
  const reset = () => cameraControl.current?.reset && cameraControl.current.reset();// Função para resetar a posição e configuração da câmera para o estado inicial

  return (
    <div
      className="
        flex
        flex-wrap
        gap-2
        items-center
        justify-center
        rounded-2xl
        px-5
        py-4
        shadow-lg
        w-fit
        mx-auto
        bg-gray-900/90
      "
      style={{
        backdropFilter: "blur(4px)",
        border: "1.5px solid #374151"
      }}
    >
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full shadow transition active:scale-95"
        title="Aproximar"
        style={{ minWidth: 42 }}
        onClick={() => zoom(-5)}
      >🔍+</button>
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full shadow transition active:scale-95"
        title="Afastar"
        style={{ minWidth: 42 }}
        onClick={() => zoom(5)}
      >🔍-</button>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full shadow transition active:scale-95"
        title="Resetar câmera"
        style={{ minWidth: 42 }}
        onClick={reset}
      >⟳</button>
    </div>
  );
}