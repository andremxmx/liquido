<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu título aquí</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3/tailwind.min.css" rel="stylesheet">
</head>
<body>
<section class="relative block bg-[#cccccc] h-screen md:h-screen">
  <div class="absolute left-1/2 top-1/2 max-w-[640px] -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] lg:w-full h-auto md:h-auto">
    <div class="grid h-full w-full gap-0 grid-cols-1 md:grid-cols-[auto]">
      <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a942fd2e6cfa2_Rectangle%201%20(2).svg" alt="" class="inline-block h-60 w-full max-w-none object-cover max-[991px]:max-[767px]:max-h-60">
      <div class="flex-col flex justify-center max-[767px]:bg-white max-[479px]:px-6 py-12 md:py-16 pl-12 pr-20">
        <div class="mx-auto block max-w-[480px] flex-col items-center justify-center">
          <h3 class="font-bold mb-2 text-2xl md:text-3xl">Newsletter Signup</h3>
          <p class="text-[#636262] max-[479px]:text-sm mb-5 md:mb-6 lg:mb-8">Egestas consectetur a cras aliquam tincidunt tellus quam. Quis faucibus tincidunt etiam sed</p>
          <div class="mx-0 mb-4">
            <form name="email-form" method="get" class="relative max-w-full">
              <input type="email" class="m-0 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 h-9 py-6" maxlength="256" name="email-4" placeholder="Enter your email" required="">
              <input type="submit" value="Subscribe" class="absolute m-0 inline-block top-[5px] cursor-pointer items-center bg-black px-6 text-center font-semibold text-white max-[479px]:relative max-[479px]:w-full py-2 right-0 sm:right-[5px]">
              <div> </div>
              <div> </div>
            </form>
          </div>
          <p class="text-[#636262] text-sm sm:text-sm">Zero spam. Only quality pixels.</p>
        </div>
      </div>
    </div>
  </div>
</section>

</body>
</html>
