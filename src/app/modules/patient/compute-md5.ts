import SparkMD5 from 'spark-md5';

/**
 * Calcula o MD5 de um File no browser de forma incremental.
 * @param file        Arquivo (File/Blob) a calcular
 * @param onProgress  Callback opcional [0..1]
 * @param chunkSize   Tamanho do chunk (default 2 MiB)
 * @returns           Hash MD5 em hex
 */
export function computeFileMD5(
  file: File | Blob,
  onProgress?: (p: number) => void,
  chunkSize = 2 * 1024 * 1024,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const spark = new SparkMD5.ArrayBuffer();
    const fileSize = file.size;
    const chunks = Math.ceil(fileSize / chunkSize);
    let currentChunk = 0;
    const reader = new FileReader();

    reader.onerror = () => reject(reader.error);
    reader.onload = e => {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        spark.append(result);
        currentChunk++;

        if (onProgress) onProgress(currentChunk / chunks);

        if (currentChunk < chunks) {
          loadNextChunk();
        } else {
          // Finaliza e retorna o hash em hex
          const hash = spark.end();
          resolve(hash);
        }
      } else {
        reject(new Error('Falha ao ler chunk do arquivo'));
      }
    };

    function loadNextChunk() {
      const start = currentChunk * chunkSize;
      const end = Math.min(start + chunkSize, fileSize);
      const blob = file.slice(start, end);
      reader.readAsArrayBuffer(blob);
    }

    // inicia
    loadNextChunk();
  });
}
