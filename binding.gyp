{
    "targets": [
        {
            "target_name": "shard-uuid",
            "sources": [ "shard-uuid.cc" ],
            "include_dirs" : [
                "<!(node -e \"require('nan')\")"
            ],
            "cflags": [
                "-std=c++0x"
            ],
            "conditions": [
                ["OS==\"mac\"", {
                    "xcode_settings": {
                        "OTHER_CPLUSPLUSFLAGS" : ["-stdlib=libc++", "-Wc++11-extensions"],
                        "MACOSX_DEPLOYMENT_TARGET": "10.7"
                    }
                }]
            ]
        }
    ]
}