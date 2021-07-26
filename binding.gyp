{
  "targets": [
    {
      "target_name": "C",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
        "backend/Cpp/all.cc"
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
